const fs = require('fs')
const promisify = require('util').promisify
const Handlebars = require('handlebars')

const readFile = promisify(fs.readFile)
const DEFAULT_CONFIG = { folder: 'src/templates', extension: 'hbs' }

module.exports = class TemplateEngine {
    constructor({ folder = DEFAULT_CONFIG.folder, extension = DEFAULT_CONFIG.extension } = DEFAULT_CONFIG) {
        this.handlebars = Handlebars.create()
        this.folder = folder
        this.extension = extension
        this.templates = {}
        this.init()
    }

    init() {
        //register instance-specific helpers here
    }

    async render(templateName, data) {
        const template = await this.resolveTemplate(templateName)
        return template(data)
    }

    async resolveTemplate(name) {
        if (!this.templates.hasOwnProperty(name)) {
            const source = await readFile(`${this.folder}/${name}.${this.extension}`)
            const template = this.handlebars.compile(source.toString())
            return this.templates[name] = template
        }
        return this.templates[name]
    }
}
