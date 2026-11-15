import { parseTextUseCase } from './parseText'

const sample = `
ООО ScanMate
Тел: +7 (999) 123-45-67
Сайт: https://scanmate.example/app
Адрес: ул. Примерная, д. 10, 101000
`

const parsed = parseTextUseCase(sample)
if (!parsed.phone?.includes('999')) throw new Error(`phone failed: ${parsed.phone}`)
if (!parsed.url?.includes('scanmate.example')) throw new Error(`url failed: ${parsed.url}`)
if (!parsed.address?.toLowerCase().includes('пример')) throw new Error(`address failed: ${parsed.address}`)
console.log('parseTextUseCase ok', parsed)
