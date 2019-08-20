Vue.component('Toggle', {
    'template': 
        `
        <as-switch
            ref="switchWidget" 
            :bind="$attrs"
            :checked=checked
            :label=label>
        </as-switch>
        `,
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            switchWidget: null,
            checked: false
        };
    },
    watch: {
        checked: function(value){
            this.$emit('input', value);
        }
    },
    mounted: function () {
        this.switchWidget = this.$refs.switchWidget;
        // anytime the airship element changes update checked
        this.switchWidget.addEventListener('change', event => {
            this.checked = event.detail;
        });
    }
});