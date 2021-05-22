const bel = require('bel')
const csjs = require('csjs-inject')
const title = require('..')
const main_title = require('./title.json')

function demoComponent() {
    const defaultTitle = {
        page: 'demo',
        name: 'title',
        content: 'Demo title',
        theme: {
            ...main_title,
        }
    }
    const title1 = {
        page: 'demo',
        name: 'title',
        content: 'Create new account',
        theme: {
            ...main_title,
            color: 'var(--color-violet-color-wheel)'
        }
    }

    const title2= {
        page: 'demo',
        name: 'title',
        content: 'Import account',
        theme: {
            ...main_title,
            color: 'var(--color-sring-green)',
            padding: '20px 0'
        }
    }
    const content = bel`
    <div class=${css.content}>
        ${title(defaultTitle)}
        ${title(title1)}
        ${title(title2)}
    </div>`

    // container
    const container = wrap(content)
    return container

    function wrap (content, terminal) {
        const container = bel`
        <div class=${css.wrap}>
            <section class=${css.container}>
                ${content}
            </section>
            ${terminal}
        </div>
        `
        return container
    }

}

const css = csjs`
:root {
    --font-primary: 1.4rem;
    --font-size: var(--font-primary);
    --font-light: 100;
    --font-normal: 300;
    --font-bold: 600;
    --color-black: hsl(0, 0%, 0%);
    --color-white: hsl(0, 0%, 100%);
    --color-orange: hsl(38, 100%, 50%);
    --color-blue: hsl(246, 100%, 50%);
    --color-sring-green: hsl(246, 100%, 50%);
    --color-violet-color-wheel: hsl(268, 100%, 50%);
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
.content 
`

document.body.append( demoComponent() )