const bel = require('bel')
const csjs = require('csjs-inject')
const protocol_maker = require('protocol-maker')

var id = 0

module.exports = title 

function title(opts, parent_wire) {
    const initial_contacts = { 'parent': parent_wire }
    const contacts = protocol_maker('input-number', listen, initial_contacts)
    function listen () {
        const { head, refs, type, data, meta } = msg // listen to msg
        const [from, to, msg_id] = head        
    }
    const {content, theme} = opts

    function handle_onclick (e) {
        const $parent = contacts.by_name['parent']
        $parent.notify($parent.make({ to: $parent.address, type: 'click', data: { event: e, target: 'title el' }}))
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

