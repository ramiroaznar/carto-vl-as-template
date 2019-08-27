Vue.component('Legend', {
    'template': 
    `
    <as-legend-category
        ref="widget"
        :bind="$attrs"
    >
    </as-legend-category>
    `,
    props: {
        data:{ type: Array }
    },
    data: function() {
        return {
            widget: null,
            isLoading: true
        }
    },
    watch: {
        data: function(newValue){
            this.isLoading = false;
            this.widget.data = newValue;
        }
    },
    mounted: function() {
        this.widget = this.$refs.widget
        const widget = this.widget;
    }
});