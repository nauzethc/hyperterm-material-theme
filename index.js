function getClickCoords(e) {
  if (e.x !== undefined) {
    return { x: e.x, y: e.y };
  } else if (e.clientX !== undefined) {
    return { x: e.clientX, y: e.clientY }
  } else{
    return { x: 0, y: 0 };
  }
}

exports.decorateTab = (Tab, { React }) => {

  return class MaterialTab extends React.Component {
    render() {
      return React.createElement(Tab, Object.assign({}, this.props, {

        onClick: (e) => {
          // Create ripple effect
          const ripple = document.createElement('div');
          ripple.classList.add('ripple');

          const bounds = e.target.getBoundingClientRect();
          const coords = getClickCoords(e);
          const size   = Math.max(bounds.width, bounds.height);
          const x      = coords.x - bounds.left - size/2;
          const y      = coords.y - bounds.top  - size/2;

          ripple.setAttribute('style', `
            width: ${size}px; height: ${size}px;
            top: ${y}px; left: ${x}px;
          `);

          e.target.parentNode.appendChild(ripple);
          setTimeout(() => { ripple.remove(); }, 1000);
        }

      }));
    }
  }

};


exports.decorateConfig = (config, t) => {

  let primary, accent, text;

  switch (config.materialTheme) {
    case 'amber':
      primary = '#FFCB2E';
      accent  = '#94751A';
      text    = '#54420E';
      break;

    case 'blue':
      primary = '#0087F5';
      accent  = '#FFFFFF';
      text    = '#E4F3FE';
      break;

    case 'blueGrey':
      primary = '#4C6C7A';
      accent  = '#FFFFFF';
      text    = '#D8E0E3';
      break;

    case 'brown':
      primary = '#674135';
      accent  = '#FFFFFF';
      text    = '#DFD6D2';
      break;

    case 'cyan':
      primary = '#6CDAE7';
      accent  = '#3F7C84';
      text    = '#23474C';
      break;

    case 'green':
      primary = '#9ED25C';
      accent  = '#5E773E';
      text    = '#34441E';
      break;

    case 'grey':
      primary = '#6C6C6C';
      accent  = '#FFFFFF';
      text    = '#E0E0E0';
      break;

    case 'indigo':
      primary = '#4558B8';
      accent  = '#FFFFFF';
      text    = '#D7DBF1';
      break;

    case 'lime':
      primary = '#C7D610';
      accent  = '#626E00';
      text    = '#414605';
      break;

    case 'orange':
      primary = '#FF9400';
      accent  = '#905400';
      text    = '#543002';
      break;

    case 'pink':
      primary = '#E81C67';
      accent  = '#37FFB3';
      text    = '#FDE7EF';
      break;

    case 'purple':
      primary = '#6842BA';
      accent  = '#A5E138';
      text    = '#DFD6F1';
      break;

    case 'red':
      primary = '#ED343A';
      accent  = '#43FFFF';
      text    = '#FEEAEA';
      break;


    case 'teal':
      primary = '#009688';
      accent  = '#FFFFFF';
      text    = '#E1F3F0';
      break;

    default:
      if (config.materialSyntax === 'light') {
        primary = 'none';
        accent  = '#607D8B';
        text    = '#607D8B';
      } else {
        primary = 'none';
        accent  = '#AABBC3';
        text    = '#FFFFFF';
      }

  }

  const palette = {
    dark: {
      borderColor: '#263238',
      cursorColor: '#AABBC3',
      foregroundColor: '#AABBC3',
      backgroundColor: '#263238',
      colors: {
        black: '#000000',
        red: '#ff5370',
        green: '#C3E88D',
        yellow: '#ffcb6b',
        blue: '#82AAFF',
        magenta: 'rgba(199, 146, 234, 1)',
        cyan: '#80CBC4',
        white: '#d0d0d0',
        lightBlack: '#5C7E8C',
        lightRed: '#F77669',
        lightGreen: '#C3E88D',
        lightYellow: '#FFEB95',
        lightBlue: '#B2CCD6',
        lightMagenta: 'rgba(199, 146, 234, 1)',
        lightCyan: '#80CBC4',
        lightWhite: 'rgba(238, 255, 255, 1)'
      }
    },

    light: {
      borderColor: '#AABBC3',
      cursorColor: '#607D8B',
      foregroundColor: '#607D8B',
      backgroundColor: '#FAFAFA',
      colors: {
        black: '#000000',
        red: '#E53935',
        green: 'rgba(145, 184, 89, 1)',
        yellow: '#EBB060',
        blue: 'rgba(97, 130, 184, 1)',
        magenta: 'rgba(148, 94, 184, 1)',
        cyan: '#39ADB5',
        white: '#90A4AE',
        lightBlack: '#5C7E8C',
        lightRed: '#FF5370',
        lightGreen: 'rgba(145, 184, 89, 1)',
        lightYellow: '#FFCF1B',
        lightBlue: 'rgba(79, 153, 184, 1)',
        lightMagenta: 'rgba(148, 94, 184, 1)',
        lightCyan: '#39ADB5',
        lightWhite: '#CFD8DC'
      }
    }
  };

  return Object.assign({}, config,
    (config.materialSyntax === 'light')
      ? palette.light
      : palette.dark,
    {
      css: `
        ${config.css || ''}
        .header_header {
          background-color: ${primary} !important;
        }
        .tabs_nav .tabs_list {
          border-bottom: 0;
        }
        .tabs_nav .tabs_title,
        .tabs_nav .tabs_list .tab_tab {
          color: ${text};
          border: 0;
        }
        .tabs_nav .tabs_list .tab_tab:not(.tab_active) {
          background-color: rgba(0,0,0,0.1);
        }
        .tabs_nav .tabs_list .tab_tab:not(.tab_active):hover {
          color: white;
        }
        .tabs_nav .tabs_list .tab_active .tab_text {
          border-bottom: 3px solid ${accent};
        }
        .ripple {
          opacity: 0;
          animation: ripple .6s;
          display: block;
          overflow: hidden;
          position: absolute;
          background-color: rgba(255,255,255,0.5);
          border-radius: 100%;
        }
        .terms_terms .terms_termGroup .splitpane_panes .splitpane_divider {
          background-color: ${(config.materialSyntax === 'light') ? '#607D8B':'#AABBC3'} !important;
        }

        @keyFrames ripple {
          from {
            opacity: 1;
            transform: scale(0);
          } to {
            opacity: 0;
            transform: scale(2.5);
          }
        }
      `
    }
  );
};
