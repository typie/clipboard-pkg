const {shell, clipboard} = require('electron');
const {AbstractTypiePackage, TypieRowItem, SearchObject} = require('typie-sdk');

class Clipboard extends AbstractTypiePackage {

    constructor(win, config, pkgPath){
        super(win, config, pkgPath);
        this.win         = win;
        this.packageName = 'Clipboard';
        this.intervalTime  = 250; // milliseconds
        this.watchInterval = null;
        this.lastPaste = clipboard.readText();
        this.startWatch();
    }

    insert(value, description="", path="", icon="") {
        let item = this.getDefaultItem(value, description, path, icon);
        item.setDescription("Activate to Paste");
        this.insertItem(item);
    }

    activate(pkgList, item, cb) {
        this.win.hide();
        this.lastPaste = item.getPath();
        clipboard.writeText(item.getPath());
        this.typie.updateCalled(item).go()
            .then(()=>{
                this.typie.pasteText().go();
            })
            .catch(()=>{});
    }

    enterPkg(pkgList, item, cb) {
        this.typie.getRows(10).orderBy('unixTime').desc().go()
            .then(res => {
                console.log('retured from unixTime fetch', res);
                this.win.send('resultList', res);
                this.win.show();
            })
            .catch(err => console.log(err));
    }

    startWatch() {
        this.watchInterval = setInterval(() => {
            let content = clipboard.readText();
            if (this.lastPaste !== content) {
                this.lastPaste = content;
                this.insert(content);
            }
        }, this.intervalTime);
    }

    destroy() {
        super.destroy();
        clearInterval(this.watchInterval);
    }
}
module.exports = Clipboard;

