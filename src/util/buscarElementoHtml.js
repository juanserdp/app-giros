export function buscarTagHtml(html, tag) {
    let tagsHtml = [];
    function recolecarTagsHtml(html) {
        if (typeof html == "object") {
            if (html.type === tag) {
                tagsHtml.push(html);
            }
            if (html.children) {
                let children = html.children;
                if (children.length == 0) {
                    return;
                }
                else if (children.length == 1) {
                    html = children[0];
                    return recolecarTagsHtml(html);
                }
                else if (children.length > 1) {
                    children.map((nodo) => {
                        html = nodo;
                        return recolecarTagsHtml(html);
                    })
                }
            }
        }
        else console.log("No ha proporcionado una estructura html valida")
    }
    recolecarTagsHtml(html);
    return tagsHtml;
}