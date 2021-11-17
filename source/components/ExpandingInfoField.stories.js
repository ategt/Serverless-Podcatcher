import { action } from '@storybook/addon-actions';
import ExpandingInfoField from './ExpandingInfoField.vue';

export default {
  title: 'Expanding Info Field',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: ExpandingInfoField,
  argTypes: {},
};

export const actionsData = {
  'add-podcast-url': action("add-podcast-url"),
};

const Template = args => ({
  components: { 
    "expanding-info-field": ExpandingInfoField,
  },
  data () {
      return {
        channel: "",
        eventListeners: args.actionsData,
      };
  },
  mounted () {
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('background-overlay');
    var openButton = document.getElementById('openOverlay');
    document.onclick = function(e){
      if(e.target.id == 'backgroundOverlay'){
          popup.style.display = 'none';
          overlay.style.display = 'none';
      }
      if(e.target === openButton){
         popup.style.display = 'block';
          overlay.style.display = 'block';
      }
    };
  },
  template: `<expanding-info-field v-bind:channel="channel"></expanding-info-field>`,
});

export const BaseForm = Template.bind({});
BaseForm.args = { actionsData };