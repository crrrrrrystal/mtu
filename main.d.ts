declare interface Window {
  Mtu: {
    toast(msg: string): void
    dialog(title: string, option?: {
      message?: string
      positive?: string
      onPositive?(): void
      negative?: string
      onNegative?(): void
      onClose?(): void
    }): void
  }
}