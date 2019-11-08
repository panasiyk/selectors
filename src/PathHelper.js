export const PathHelper = {
    getPathPrefix(name){
        for ( let key in this.pathList()){
            if(this.pathList()[key] === name)
                return key
        }

    },
    pathList(){
        return {
            s: "terms",
            b: "brands_terms",
            st: "styles",
        }
    },

    paramsList(){
        return {
            s: "service_slug",
            b: "brand_slug",
            st: "style_slug",
        }
    },

    getArrayOfSelectedPath() {
        let arrayOfPath = window.location.pathname.length > 1 ? window.location.pathname.split("/") : [];
        if (arrayOfPath.length > 1)
            arrayOfPath.splice(0, 1);
        return arrayOfPath;
    },

    getClearArrayOfSelectedPath() {
        let obj= {};
        this.getArrayOfSelectedPath().forEach(el => {
            for ( let key in this.pathList()){
                if(el.substring(0, 4).includes(key+"-"))
                    obj[this.paramsList()[key]] = el.replace(key+"-","");
            }
        });
        return obj

    },

    routeCreator(value, name) {
        let route = `${this.getPathPrefix(name)}-${value}`;
        let arrayOfPath = this.getArrayOfSelectedPath();

        arrayOfPath = arrayOfPath.filter(path => !(path.substring(0, 3) === `${this.getPathPrefix(name)}-`));
        arrayOfPath.push(route);
        return arrayOfPath.join("/");
    }
}
