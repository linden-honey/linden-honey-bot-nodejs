const fs = require('fs')
const { promisify } = require('util')
const Handlebars = require('handlebars')

const readFile = promisify(fs.readFile)
const defaults = { folder: 'src/templates', extension: 'hbs' }

class TemplateEngine {
    constructor({
        folder = defaults.folder,
        extension = defaults.extension,
    } = defaults) {
        this.handlebars = Handlebars.create()
        this.folder = folder
        this.extension = extension
        this.templates = {}
        this.init()
    }

    init = () => {
        // register instance-specific helpers here
    }

    render = async (templateName, data) => {
        const template = await this.resolveTemplate(templateName)
        return template(data)
    }

    resolveTemplate = async (name) => {
        if (!(name in this.templates)) {
            const source = await readFile(`${this.folder}/${name}.${this.extension}`)
            const template = this.handlebars.compile(source.toString())
            this.templates[name] = template
        }
        return this.templates[name]
    }
}

module.exports = TemplateEngine
