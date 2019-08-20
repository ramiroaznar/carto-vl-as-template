Vue.component('Histogram', {
    'template': 
    `
    <as-histogram-widget
        ref="widget"
        :bind="$attrs"
    >
    </as-histogram-widget>
    `,
    props: {
        data: Array
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