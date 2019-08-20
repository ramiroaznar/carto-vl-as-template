Vue.component('Categories', {
    'template': 
    `
    <as-category-widget
        ref="widget"
        :bind="$attrs"
    >
    </as-category-widget>
    `,
    props: {
        categories:{ type: Array }
    },
    data: function() {
        return {
            widget: null,
            isLoading: true
        }
    },
    watch: {
        categories: function(newValue){
            this.isLoading = false;
            this.widget.categories = newValue;
        }
    },
    mounted: function() {
        this.widget = this.$refs.widget
        const widget = this.widget;
    }
});