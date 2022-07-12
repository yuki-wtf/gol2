import { ThemeProvider } from 'styled-components';
import { withThemes } from '@react-theming/storybook-addon';
import { infinite } from '../app/styles/themes/infinite'
import { creator } from '../app/styles/themes/creator'

export const decorators = [
  withThemes(ThemeProvider, [infinite, creator])
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
