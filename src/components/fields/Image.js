const { h, setChildren, setStyle, text } = require('redom')
const filesize = require('filesize')
const Button = require('../Button')
const Field = require('./Field')
const Icon = require('../Icon')
const Toolbar = require('../Toolbar')

module.exports = class Image extends Field {
  constructor(config, data) {
    const defaultConfig = {
      oninput: () => {},
    }

    config = Object.assign(defaultConfig, config)

    super(config, data)

    this.field = h('.bg-black-05.black-50.bn.br2.db.f5.h5.pa2',

      this.inputContainer = h('.h-100',
        h('.h-100.relative',
          this.imageInput = h('input.db.h-100.o-0.w-100', { accept: 'image/*', type: 'file' }),

          h('.absolute.absolute--fill.flex.items-center.justify-center.pointer-events-none',
            h('.flex.items-center',
              new Icon({ cls: '.h3.w3', name: 'Photo' }),

              h('.flex-auto.pl3',
                h('h2.f4.fw5.lh-title.ma0.mb1', 'Drag & Drop Image Here'),
                h('p.f7.fw4.lh-copy.ma0', 'or ',
                    h('u', 'Upload an Image.'),
                    h('span.ml1', '(jpeg, gif, png or svg)')
                )
              )
            )
          )
        )
      ),

      this.imageContainer = h('.dn.h-100',
        h('.flex.h-100',
          h('.flex.h-100.items-center.justify-center.w-40',
            this.image = h('img.db.h-100.w-100')
          ),

          h('.w-60.pa3',
            this.imageName = h('h3.black.f5.fw5.lh-title.ma0.mb3'),

            h('.f6.flex.items-center.lh-copy.mb1',
              new Icon({ cls: '.dib.h1.mr2.w1', name: 'Size' }),

              this.imageWidth = text(), text(' × '), this.imageHeight = text()
            ),

            h('.f6.flex.items-center.lh-copy',
              new Icon({ cls: '.dib.h1.mr2.w1', name: 'Speed' }),

              this.imageSize = text()
            ),

            new Toolbar({
              border: false,
              spacing: false,
              cls: '.mv3',
              children: [
                h('label.mr2',
                  this.replaceImageButton = new Button({
                    text: 'Replace',
                    onclick: e => this.imageInput.click(),
                    icon: new Icon({ cls: '.h1.w1', name: 'Replace' }),
                  })
                ),

                this.deleteImageButton = new Button({
                  text: 'Delete',
                  onclick: e => {
                    if (confirm('Are you sure you want to delete this image?')) {
                      this.image.src = ''
                      this.imageInput.value = ''
                      this.toggleImageContainer()
                    }
                  },
                  icon: new Icon({ cls: '.h1.w1', name: 'Delete' }),
                })
              ]
            }),
          )
        )
      )
    )

    setStyle(this.image, { objectFit: 'contain' })

    this.field.ondragover = e => e.preventDefault()

    this.field.ondrop = e => {
      e.preventDefault()
      this.toggleImageContainer()
      this.setImageDetails(e.dataTransfer.files[0])
    }

    this.imageInput.name = config.name

    this.imageInput.oninput = e => {
      if (this.imageContainer.classList.contains('dn')) {
        this.toggleImageContainer()
      }

      this.setImageDetails(e.target.files[0])

      config.oninput.call(this, e)
    }

    setChildren(this.content, this.field)
  }

  setImageDetails(file) {
    const reader = new FileReader()
    reader.onloadend = () => this.image.src = reader.result
    reader.readAsDataURL(file)

    this.image.onload = e => {
      this.imageWidth.textContent = this.image.naturalWidth
      this.imageHeight.textContent = this.image.naturalHeight
    }

    this.imageName.textContent = file.name
    this.imageSize.textContent = filesize(file.size, { base: 10, round: 0 })
  }

  toggleImageContainer() {
    this.inputContainer.classList.toggle('dn')
    this.imageContainer.classList.toggle('dn')
  }
}
