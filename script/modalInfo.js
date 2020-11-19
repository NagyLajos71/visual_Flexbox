const modalAdditionalInformation = {
  
  flexDirection: {
    propertyDescription:
      "this property establishes the MAIN AXIS, thus defining the direction flex items are placed in the flex container.",
    values: {
      'row': "this is the default selection; the MAIN AXIS direction leads from left to right",
      'row-reverse': "the MAIN AXIS direction leads from right to left",
      'column': "the MAIN AXIS direction leads from top to bottom",
      'column-reverse': "the MAIN AXIS direction leads from bottom to top",
    },
  },
  flexWrap:{
    propertyDescription:
    'this property sets whether flex items are forced onto one line or can wrap onto multiple lines. By default, flex items will all try to fit onto one line.',
    values:{
      'nowrap':'this is the default selection; the flex items are laid out in a single line, which may cause the flex container to overflow.',
      'wrap':'flex items will wrap onto multiple lines, from top to bottom.',
      'wrap-reverse':'flex items will wrap onto multiple lines from bottom to top.'
    }
  },
  justifyContent:{
    propertyDescription:"this property defines how the browser distributes space between and around content items along the main-axis. Please note: if in a layout there is at least one flexible element (with flex-grow different from 0) this property setting will have no effect as there won't be any available space.",
    values:{
      'flex-start':'this is the default selection; the items are packed flush to each other toward the edge of the main axis start side.',
      'flex-end':'the items are packed flush to each other toward the edge of the main axis end side.',
      'center':'the items are packed flush to each other toward the center along the main axis.',
      'space-between':'items are evenly distributed in the line; first item is on the start line, last item on the end line',
      'space-around':'items are evenly distributed in the line with equal space around them. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.',
      'space-evenly':'items are distributed so that the spacing between any two items (and the space to the edges) is equal.'
    }
  },
  alignItems:{
    propertyDescription:
    'this property defines the default behavior for how flex items are laid out along the CROSS AXIS. Please note that the align-self property applied on any individual item can overwrite this property',
    values:{
      'stretch':'this is the default selection; the items stretch to fill the container (but still respect min-width/max-width values if present)',
      'flex-start':'items are placed at the start of the CROSS AXIS.',
      'flex-end':'items are placed at the end of the CROSS AXIS.',
      'center':'items are centered in the CROSS AXIS',
      'baseline':'items are aligned such as their baselines align'
    }
  },
  alignContent:{
    propertyDescription:'Note: There must be multiple line setting (flex-wrap to set as wrap) for this property to have any effect! It helps to align a flex container’s lines within it when there is extra space in the cross-axis. Align-content vs align-items: The effect of both align-items and align-content is visible along the cross-axis (it depends on the flex-direction setting). The align-items property determines how flex items are positioned within a flex line, along the cross-axis. The align-content property determines how flex lines are positioned along the cross-axis when there is extra space available.',
    values:{
      'stretch':'default selection; lines stretch to take up the remaining space',
      'flex-start':'lines packed to the start of the CROSS AXIS',
      'flex-end':'lines packed to the end of the CROSS AXIS',
      'center':'lines packed to the center of the CROSS AXIS',
      'space-between':'lines are evenly distributed; the first line is at the start of the corss axis while the last one is at the end',
      'space-around':'lines are evenly distributed with equal space between them',
      'space-evenly':'lines are evenly distributed. The empty space before the first and after the last item equals half of the space between each pair of adjacent items.'

    }
  },
  order:{
    propertyDescription:'the order property is only meant to affect the visual order of elements and not their logical order',
    values:{
      addl:'by default, flex items are displayed in the same order as they appear in the source document. The order property can be used to change this ordering. Items are sorted by order value (ascending) and then by their source code order. In this very example the initial values for every item is set to: 1. So selecting an item and setting the order property let say to 2 will not place the item to the 2nd position, but to the very end (see previous sentence as explanation).'
    }
  },
  alignSelf:{
    propertyDescription:'this property allows the default alignment (the one specified by align-items) to be overridden for individual flex items.',
    values:{
      'auto':'this is the default selection; it uses to the parent div`s align-items setting',
      'stretch':'the item is stretched along the CROSS AXIS',
      'center':'item is centered in the CROSS AXIS',
      'baseline': 'item is aligned such as it`s baseline is aligned',
      'flex-start': 'flthe item is placed on the CROSS AXIS start line',
      'flex-end': 'the item is placed on the CROSS AXIS end line'
    }
  },
  flexGrow:{
    propertyDescription:'the property distributes free space in the container along the MAIN AXIS. Without free space this property has no effect. The flex-grow property specifies how much the item can grow relative to the rest of the other flexible items inside the same container.',
    values:{
      addl:'flex-grow: 0 means that the item will not grow by default to fill the available space. If the flex-grow were set to a positive value for one item only, this would cause the item to grow and take up any available space. If you want the proportions to always stay the same you’ll need to use flex-shrink and flex-basis.'
    }

  },
  flexShrink:{
    propertyDescription:'flex-shrink is designed to distribute negative free space in the container. In other words, it only works when flex items are big enough to overflow the container.',
    values:{
      addl:'If flex-shrink has an effect, the actual flex items shrink in size. The items with the same flex-shrink value loose the same portion of size. Default selection is 1 - it means the element can not shrink further than the size required to fit its content. flex-shrink: 0 meanst that the element will retain the width it needs, and does not wrap its content. Please note that if you have flex-wrap enabled the items will wrap first even if there`s plenty of shrink-potential. '
    }
  },
  flexBasis:{
    propertyDescription:'flex-basis specifies the he ideal or hypothetical size of the flex item, before any available space is distributed according to the flex factors (flex-grow and flex-shrink). So flex-basis is not a guaranteed size! As soon as the browser places the items into their flex container, things change. Often times the flex container won`t have enough space, or will have extra space, after all its items flex-basis values are added up.',
    values:{
      addl:'It`s value can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means “look at my width or height property”.If no flex-basis is specified, then the flex-basis falls back to the items width property. If no width is specified, then the flex-basis falls back to the computed width of the item`s contents. In case of conflicting witdth and flex-basis settings the latter is used. '
    }
  }
};

export default modalAdditionalInformation
