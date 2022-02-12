const bel = require('bel')
const csjs = require('csjs-inject')
const message_maker = require('message-maker')

var id = 0

module.exports = title 

function title(opts, parent_protocol) {
    console.log({opts, parent_protocol})
// ---------------------------------------------------------------
    const myaddress = `title-${id++}`
    const inbox = {}
    const outbox = {}
    const recipients = {}
    const message_id = to => ( outbox[to] = 1 + (outbox[to]||0) )

    const {notify, address} = parent_protocol(myaddress, listen)
    const make = message_maker(myaddress)
    let message = make({ to: address, type: 'ready', refs: ['old_logs', 'new_logs'] })
    notify(message)

    function listen (msg) {

    }
// ---------------------------------------------------------------
    const {page, flow, name, content, theme} = opts

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

