'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QRDisplay({ url }: { url: string }) {
  return (
    <QRCodeSVG
      value={url}
      size={220}
      bgColor="#ffffff"
      fgColor="#0D0D0D"
      level="H"
      includeMargin={false}
    />
  )
}
