import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type { ColorValue, HostComponent, ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Double,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

export type ChangeTextEvent = Readonly<{
  text: string;
  // Incremented by native on every user edit. Echo it back through
  // `mostRecentEventCount` so stale `text` props are not applied.
  eventCount: Int32;
}>;

export type SelectionChangeEvent = Readonly<{
  start: Double;
  end: Double;
}>;

export type FocusChangeEvent = Readonly<{
  focused: boolean;
}>;

type FontConfig = Readonly<{
  family?: string;
  boldFamily?: string;
  italicFamily?: string;
  boldItalicFamily?: string;
  size?: Double;
  lineHeight?: Double;
}>;

type GutterConfig = Readonly<{
  fontFamily?: string;
  fontSize?: Double;
  minimumWidth?: Double;
  leadingInset?: Double;
  trailingInset?: Double;
}>;

type EditorColors = Readonly<{
  background?: ColorValue;
  foreground?: ColorValue;
  caret?: ColorValue;
  gutterBackground?: ColorValue;
  gutterText?: ColorValue;
  gutterCurrentLineText?: ColorValue;
  currentLine?: ColorValue;
}>;

// Highlight spans over UTF-16 offsets of `text`. `color` is a #RRGGBB or
// #RRGGBBAA string. `fontStyle` bits: 1 italic, 2 bold.
type HighlightSpan = Readonly<{
  start: Int32;
  length: Int32;
  color: string;
  fontStyle: Int32;
}>;

type ContentInsets = Readonly<{
  top?: Double;
  bottom?: Double;
  left?: Double;
  right?: Double;
}>;

export interface NativeProps extends ViewProps {
  text?: string;
  mostRecentEventCount?: Int32;
  editable?: boolean;
  font?: FontConfig;
  theme?: string;
  language?: string;
  lineNumbers?: boolean;
  wrapLines?: boolean;
  gutter?: GutterConfig;
  colors?: EditorColors;
  highlights?: ReadonlyArray<HighlightSpan>;
  contentInsets?: ContentInsets;

  onChangeText?: DirectEventHandler<ChangeTextEvent>;
  onSelectionChange?: DirectEventHandler<SelectionChangeEvent>;
  onFocusChange?: DirectEventHandler<FocusChangeEvent>;
}

export type SourceEditorViewType = HostComponent<NativeProps>;

interface NativeCommands {
  focus: (viewRef: React.ElementRef<SourceEditorViewType>) => void;
  blur: (viewRef: React.ElementRef<SourceEditorViewType>) => void;
  setSelection: (
    viewRef: React.ElementRef<SourceEditorViewType>,
    start: Int32,
    end: Int32
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['focus', 'blur', 'setSelection'],
});

export default codegenNativeComponent<NativeProps>(
  'SourceEditor'
) as SourceEditorViewType;
