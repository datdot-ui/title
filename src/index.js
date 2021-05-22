const bel = require('bel')
const csjs = require('csjs-inject')

module.exports = title 
function title(option) {
    const {page, flow, name, content, theme} = option

    function ui_element(css) {
        const widget = 'ui-title'
        const element = bel`<h2 class=${css.title}>${content}</h2>`
        return element
    }
    
    if (theme)
        var {fontFamily, fontSize, fontWeight, lineHeight, color, padding } = theme

    const style = csjs`
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

    return ui_element(style)
}

