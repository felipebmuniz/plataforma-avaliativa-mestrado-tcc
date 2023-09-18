import '@emotion/react';
import { CompanyTheme } from '@/types/theme';

declare module '@emotion/react' {
  export interface Theme extends CompanyTheme {}
}
