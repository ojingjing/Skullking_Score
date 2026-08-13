export default function PageLayout({ children, footer, className = "" }) {
  return (
    <div
      className={`
        game-page
        min-h-[100dvh]
        flex
        flex-col
        bg-texture
        text-[#e8d5a8]
        ${className}
      `}
    >
      {/* 콘텐츠 */}
      <main className="page-content flex-1">{children}</main>

      {/* 하단 버튼 */}
      {footer && <footer className="page-footer">{footer}</footer>}
    </div>
  );
}
