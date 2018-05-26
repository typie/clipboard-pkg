const { clipboard } = require('electron');
const { AbstractTypiePackage, TypieRowItem } = require('typie-sdk');

class Clipboard extends AbstractTypiePackage {

    constructor(win, config, pkgPath){
        super(win, config, pkgPath);
        this.win         = win;
        this.packageName = 'Clipboard';
        this.intervalTime  = 250; // milliseconds -> do not lower below 250
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

    remove(pkgList, item, cb) {
        if (!TypieRowItem.isPackage(item)) {
            this.typie.remove(item).go()
                .then(data => {
                    this.win.send("deleteItem", item);
                }).catch(e => console.error(e));
        }
    }

    enterPkg(pkgList, item, cb) {
        this.typie.getRows(10).orderBy('unixTime').desc().go()
            .then(res => {
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

