export default function Divider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden>
      <svg
        viewBox="0 0 360 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm opacity-50"
        fill="none"
      >
        <line x1="0" y1="12" x2="140" y2="12" stroke="#C9922A" strokeWidth="0.75" />
        <polygon points="148,12 152,7 156,12 152,17" fill="#C9922A" />
        <polygon points="158,12 162,7 166,12 162,17" fill="none" stroke="#C9922A" strokeWidth="0.75" />
        {/* center diamond */}
        <polygon points="170,12 180,4 190,12 180,20" fill="none" stroke="#F0B429" strokeWidth="1" />
        <polygon points="175,12 180,7 185,12 180,17" fill="#F0B429" />
        {/* mirror */}
        <polygon points="194,12 198,7 202,12 198,17" fill="none" stroke="#C9922A" strokeWidth="0.75" />
        <polygon points="204,12 208,7 212,12 208,17" fill="#C9922A" />
        <line x1="220" y1="12" x2="360" y2="12" stroke="#C9922A" strokeWidth="0.75" />
      </svg>
    </div>
  )
}
