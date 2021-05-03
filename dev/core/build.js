import path from 'path'
import fs from 'fs'
import htmlParser from 'node-html-parser'
import htmlMinifier from 'html-minifier'
import beautify from 'js-beautify'

const resolve = (...args) => path.resolve(path.dirname(process.argv[1]), '../../', ...args)

for (const item of fs.readdirSync(resolve('./dev/src'))) {
  if (item === 'demo') continue
  const toDir = resolve('./src/', item)
  !fs.existsSync(toDir) && fs.mkdirSync(toDir)
  for (const name of fs.readdirSync(resolve('./dev/src', item))) {
    console.log('Running ', `${item}/${name}`)
    if (name.endsWith('.html')) {
      const dom = htmlParser.parse(fs.readFileSync(resolve('./dev/src', item, name)).toString())
      const template = dom.querySelector('template')
      const templateStr = htmlMinifier.minify(template.innerHTML, { collapseWhitespace: true, minifyCSS: true })
      const scriptStr = dom.querySelector('script').innerHTML.replace('$template', '`' + templateStr + '`')
      fs.writeFileSync(`${toDir}/${name.slice(0, name.length - 5)}.js`, beautify.js_beautify(scriptStr, { brace_style: 'preserve-inline', indent_size: 2 }))
      continue
    }
    if (name.endsWith('.woff2')) fs.copyFileSync(resolve('./dev/src', item, name), resolve('./dist', name))
    fs.copyFileSync(resolve('./dev/src', item, name), `${toDir}/${name}`)
  }
}