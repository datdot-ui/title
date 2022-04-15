const bel = require('bel')
const csjs = require('csjs-inject')

var id = 0

module.exports = title 

function title(opts) {
    const {content, theme} = opts

    function handle_onclick (e) {
        const { make } = recipients['parent']
        notify(make({ to: address, type: 'click', data: { event: e, target: 'title el' }}))
    }
    
    if (theme) var {fontFamily, fontSize, fontWeight, lineHeight, color, padding } = theme

    const css = csjs`
    .title {
        font-family: ${fontFamily ? fontFamily : 'Arial, Helvetica, sans-serif'};
        font-size: ${fontSize ? fontSize : '2.2rem'};
        font-weight: ${fontWeight ? fontWeight : '600'};
        line-height: ${lineHeight ? lineHeight : '2.4rem'};
        color: ${color ? color : 'hsl(0, 0%, 0%)'};
        padding: ${padding ? padding : '0'};
    }
    h2 {
        margin: 0;
    }
    `

    const element = bel`<h2 class=${css.title} onclick=${e => handle_onclick(e)}>${content}</h2>`
    return element
}

