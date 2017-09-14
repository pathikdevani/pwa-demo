import Loader from "./loader";


class Appshell {
    constructor(container) {
        this.container = container;
    }

    loadAndRender(tags = "test") {
        var $this = this;
        $this.container.empty($this.container);
        Loader.start($this.container);

        $.get(`https://api.github.com/search/repositories?q=topic:${tags}&page=1&per_page=10`, function (data) {
            $.each(data.items, function (i, item) {
                var $item = $($this.itemTemplate(item.name, item.description, item.stargazers_count));
                $item.on({
                    click: function () {
                        
                    }
                });
                $this.container.append($item);
            });
            Loader.stop($this.container);
        });
    }


    itemTemplate(name, dis, star, watcher) {
        var _template = `
            <div class='item col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3'>
                <div class="box">
                    <div class="name">${name}</div>
                    <div class="dis">
                        ${dis}
                    </div>
                    <div class="star">
                        Start: ${star}
                    <div>
                </div>
            </div>
        `;
        return _template;
    }
}


export default Appshell;

