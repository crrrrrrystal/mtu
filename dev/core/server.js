import http from 'http'
import path from 'path'
import fs from 'fs'
import mimeTypes from 'mime-types'
import htmlParser from 'node-html-parser'
import childProcess from 'child_process'
import htmlMinifier from 'html-minifier'

const resolve = (...args) => path.resolve(path.dirname(process.argv[1]), '../../', ...args)
const devHTML = fs.readFileSync(resolve('./dev/core/index.html')).toString()

const parse = (file) => {
  const html = htmlParser.parse(devHTML)
  const dom = htmlParser.parse(fs.readFileSync(resolve('./dev/src', file)).toString())
  const view = dom.querySelector('div')
  const template = dom.querySelector('template')
  const body = html.querySelector('body')
  body.insertAdjacentHTML('beforeend', view.innerHTML)
  body.insertAdjacentHTML('afterbegin', '<script>window.$template=`' + htmlMinifier.minify(template.innerHTML, { collapseWhitespace: true, minifyCSS: true }) + '`</script>')
  body.appendChild(dom.querySelector('script'))
  return html.innerHTML
}


const call = () => {
  const statics = {}
  const css = (url, file, res) => {
    statics[url] = fs.readFileSync(file)
    res.setHeader('Content-Type', 'application/javascript')
    res.write(`
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '${url}'
      document.head.append(link)
    `)
    res.end()
  }

  return async (req, res) => {
    const url = req.url
    //page
    if (url.startsWith('/dev/') && url.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html')
      const file = resolve('./dev/src/', url.slice(5))
      if (!fs.existsSync(file)) {
        res.statusCode = 404
        res.write('Not Found')
        return res.end()
      }
      res.write(parse(url.slice(5)))
      return res.end()
    }
    //css
    if (statics[url] && req.headers.accept !== '*/*') {
      res.setHeader('Content-Type', 'text/css')
      res.write(statics[url])
      return res.end()
    }
    //dev file
    if (url.startsWith('/dev/') && (url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.woff2'))) {
      const name = url.slice(5)
      const file = fs.existsSync(resolve('./dev/src', name)) ? resolve('./dev/src', name) : resolve('./src/', name)
      if (url.endsWith('.css')) {
        statics[url] = fs.readFileSync(file)
        return css(url, file, res)
      }
      try {
        const buffer = fs.readFileSync(file)
        res.setHeader('Content-Type', mimeTypes.contentType(file))
        res.write(buffer)
      } catch (error) {
        res.statusCode = 404
        res.write('Not Found')
      }
      return res.end()
    }
    const file = resolve('./', url.slice(1))
    if (fs.existsSync(file)) {
      const buffer = fs.readFileSync(file)
      res.setHeader('Content-Type', mimeTypes.contentType(file))
      res.write(buffer)
      return res.end()
    }
    res.statusCode = 404
    res.write('Not Found')
    res.end()
  }
}

const server = http.createServer(call())
const port = 9990
server.listen(port)
childProcess.exec(`start http://127.0.0.1:${port}/dev/demo/main.html`)