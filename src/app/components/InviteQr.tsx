'use client';

import { QRCodeCanvas } from "qrcode.react";

type InviteQrProps = {
  value: string;
  size?: number;
};

export function InviteQr({ value, size = 180 }: InviteQrProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <QRCodeCanvas
          value={value}
          size={size}
          level="H"
          includeMargin
        />
      </div>
      <p className="text-sm text-white/90">
        Quét mã QR để mở thiệp
      </p>
    </div>
  );
}

