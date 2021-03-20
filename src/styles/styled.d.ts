import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      primary: string;
      secondary: string;
      tertiary: string;
      one: string;
      two: string;
      three: string;
      four: string;
      five: string;

      white: string;
      black: string;
      gray: string;

      success: string;
      info: string;
      warning: string;
      go: string;
    };
  }
}
