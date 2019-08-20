Vue.component('RangeSlider', {
    'template': 
        `<div class="range-slider-widget">
            <as-widget-header>
                <h2 class="as-widget-header__header">{{title}}</h2>
            </as-widget-header>
            <as-range-slider
                ref="rangeSliderWidget" 
                :min-value="minValue"
                :max-value="maxValue"
                :step="step"
                :draggable="draggable"
                :disabled="disabled"
            >
            </as-range-slider>
        </div>
        `,
    props: {
        title: {
            type: String,
            required: true
        },
        minValue: Number,
        maxValue: Number,
        step: Number,
        disabled: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        formatValue: { type: Function, default: (value) => value }
    },
    data: function () {
        return {
            rangeSliderWidget: null,
            range: null
        };
    },
    watch: {
        range: function(value){
            this.$emit('input', value);
        }
    },
    computed: {
        value: function(){
            return this.range;
        }
    },
    mounted: function () {
        this.rangeSliderWidget = this.$refs.rangeSliderWidget;
        const widget = this.rangeSliderWidget;

        // Widget set up
        widget.addEventListener('changeEnd', event => {
            this.range = event.detail;
        });

        widget.formatValue = this.formatValue;        

        if (this.draggable){
            widget.range = [this.minValue, this.maxValue];
        }
    }
});