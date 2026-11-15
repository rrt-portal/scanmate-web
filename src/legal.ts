import type { Lang } from './storage'

export function privacyHtml(lang: Lang): string {
  if (lang === 'ru') {
    return `<h2>Политика конфиденциальности</h2>
<p>ScanMate Web — превью. Изображения обрабатываются локально в браузере через OCR (Tesseract.js). История и настройки хранятся в localStorage / IndexedDB на вашем устройстве.</p>
<p>Мы не отправляем ваши скриншоты на сервер ScanMate. Сторонние CDN шрифтов не используются. Демо-реклама не загружает сеть AdMob.</p>
<p>Превью-биллинг не передаёт платёжные данные и не списывает средства.</p>`
  }
  return `<h2>Privacy Policy</h2>
<p>ScanMate Web is a preview. Images are processed locally in the browser via OCR (Tesseract.js). History and settings stay in localStorage / IndexedDB on your device.</p>
<p>We do not upload your screenshots to a ScanMate server. No third-party font CDN is used. Demo ads do not load the AdMob network.</p>
<p>Preview billing does not transmit payment data or charge money.</p>`
}

export function termsHtml(lang: Lang): string {
  if (lang === 'ru') {
    return `<h2>Условия использования</h2>
<p>Приложение предоставляется «как есть» для демонстрации UX ScanMate. Pro-покупка в превью симулируется локально и не является реальной транзакцией Google Play / App Store.</p>
<p>Вы отвечаете за контент изображений, которые выбираете для OCR. Не используйте сервис для незаконного контента.</p>
<p>Функции и лимиты могут меняться между этапами превью.</p>`
  }
  return `<h2>Terms of Use</h2>
<p>The app is provided as-is to demonstrate ScanMate UX. The Pro purchase in this preview is simulated locally and is not a real Google Play / App Store transaction.</p>
<p>You are responsible for the image content you choose for OCR. Do not use the service for unlawful content.</p>
<p>Features and limits may change between preview stages.</p>`
}
