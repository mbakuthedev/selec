import { load } from 'cheerio'

const res = await fetch('https://www.selec.com/product-details/smart-multifunction-meter', {
  headers: { 'User-Agent': 'Mozilla/5.0' },
})
const html = await res.text()
const $ = load(html)
console.log('tr', $('.specificationMain tr').length)
console.log('sku', $('.product-sku').text().replace(/\s+/g, ' ').trim().slice(0, 120))
console.log('li', $('.prd-block_description li').length)
console.log('tabs', $('.tab-pane a').length)
console.log('h1', $('h1').first().text().replace(/\s+/g, ' ').trim())
const first = $('.specificationMain tr').first()
console.log('cells', first.find('th,td').map((_, el) => $(el).text().replace(/\s+/g, ' ').trim()).get())
console.log('doc', $('.tab-pane a').first().text().replace(/\s+/g, ' ').trim(), $('.tab-pane a').first().attr('href'))
