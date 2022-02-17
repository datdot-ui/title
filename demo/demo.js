const bel = require('bel')
const csjs = require('csjs-inject')
const title = require('..')
const main_title = require('./title.json')
const message_maker = require('message-maker')
const logs = require('datdot-ui-logs')

var id = 0

function demo() {
// ---------------------------------------------------------------
const myaddress = `${__filename}-${id++}`
    const inbox = {}
    const outbox = {}
    const recipients = {}
    const names = {}
    const message_id = to => (outbox[to] = 1 + (outbox[to]||0))

    function make_protocol (name) {
        return function protocol (address, notify) {
            names[address] = recipients[name] = { name, address, notify, make: message_maker(myaddress) }
            return { notify: listen, address: myaddress }
        }
    }
    function listen (msg) {
        console.log('New message', { msg })
        const { head, refs, type, data, meta } = msg // receive msg
        inbox[head.join('/')] = msg                  // store msg
        const [from] = head
        recipients['logs'].notify(msg)
        // send back ack
        const { notify, make, address } = names[from]
        notify(make({ to: address, type: 'ack', refs: { 'cause': head } }))
    }
// ---------------------------------------------------------------
    const log_list = logs(make_protocol('logs'))
    const defaultTitle = title({
        page: 'demo',
        name: 'title',
        content: 'Demo title',
        theme: {
            ...main_title,
        }
    }, make_protocol('title-demo'))
    const title1 = title({
        page: 'demo',
        name: 'title',
        content: 'Create new account',
        theme: {
            ...main_title,
            color: 'var(--color-violet-color-wheel)'
        }
    }, make_protocol('title-1'))

    const title2= title({
        page: 'demo',
        name: 'title',
        content: 'Import account',
        theme: {
            ...main_title,
            color: 'var(--color-sring-green)',
            padding: '20px 0'
        }
    }, make_protocol('title-2'))

    const el = bel`
        <div class=${css.wrap}>
            <section class=${css.container}>
                <div class=${css.content}> ${defaultTitle} ${title1} ${title2} </div>
            </section>
            ${log_list}
        </div>`
    
    console.log({el})
    return el

}

const css = csjs`
:root {
    --font-primary: 1.4rem;
    --font-size: var(--font-primary);
    --font-light: 100;
    --font-normal: 300;
    --font-bold: 600;
    --color-dark: 223, 13%, 20%;
    --color-black: hsl(0, 0%, 0%);
    --color-white: hsl(0, 0%, 100%);
    --color-orange: hsl(38, 100%, 50%);
    --color-blue: hsl(246, 100%, 50%);
    --color-sring-green: hsl(246, 100%, 50%);
    --color-violet-color-wheel: hsl(268, 100%, 50%);
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 127, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green: 136, 81%, 34%;
    --color-light-green: 97, 86%, 77%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-green-yellow-crayola: 51, 100%, 83%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --size12: 1.2rem;
    --size14: 1.4rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size36: 3.6rem;
    --size40: 4rem;
}
html {
    box-sizing: border-box;
    height: 100%;
    font-size: 62.5%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: var(--font-primary);
    background-color: rgba(0, 0, 0, .1);
    height: 100%;
}
.wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 75vh 25vh;
}
.container {
    padding: 25px;
    overflow-y: auto;
}
.content {}
[data-state="view"] i-log {
    display: none;
}
[data-state="debug"] i-log {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
}
@media (max-width: 768px) {
    [data-state="debug"] {
        grid-template-rows: 65% 35%;
        grid-template-columns: auto;
    }
    [data-state="debug"] i-log {
        position: inherit;
        width: 100%;
    }
    .container {
        grid-template-rows: 80px auto;
    }
}
`

document.body.append(demo())