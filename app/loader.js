class Loader {
    static start(object) {
        object.append($(_template));
        object.addClass("cs-loader-parent");
    }

    static stop(object) {
        object.find(">.cs-loader").remove();
        object.removeClass("cs-loader-parent");
    }
}

export default Loader;

var _template = `
<div class="cs-loader">
    <div class="cs-loader-inner">
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
    </div>
</div>
`;
