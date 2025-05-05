import { AriaAttributes, PropsWithChildren, ReactNode } from 'react';
import {
	ButtonProps,
	FlexProps,
	ModalProps,
	ScrollAreaProps,
	StepperProps,
	SwitchProps, TextInputProps,
	TooltipProps,
} from '@mantine/core';

const renderAsButton = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({
		children,
		'aria-label': ariaLabel,
		onClick,
		disabled,
	}: ButtonProps & AriaAttributes & { onClick: () => void }) {
		return (
			<button
				aria-label={ariaLabel ?? ''}
				data-testid={mockName}
				disabled={disabled}
				onClick={onClick}
				type="button"
			>
				{children}
			</button>
		);
	};

const renderAsDiv = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({ onClick, children }: PropsWithChildren & FlexProps) {
		return (
			<div
				data-testid={mockName}
				onClick={onClick}
			>
				{children}
			</div>
		);
	};

const renderAsLabel = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({ children }: PropsWithChildren & FlexProps) {
		return (
			<label data-testid={mockName} >
				{children}
			</label>
		);
	};

const renderAsNav = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({ onClick, children }: PropsWithChildren & FlexProps) {
		return (
			<nav
				data-testid={mockName}
				onClick={onClick}
			>
				{children}
			</nav>
		);
	};

const renderAsP = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({ children }: PropsWithChildren & FlexProps) {
		return <p data-testid={mockName}>{children}</p>;
	};

const renderAsInput = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function ({
		value,
		onChange,
		onClick,
		leftSection,
		rightSection,
		placeholder,
	}: TextInputProps) {
		return (
			<>
				{leftSection}
				<input
					data-testid={mockName}
					onChange={onChange}
					onClick={onClick}
					placeholder={placeholder}
					role="input"
					value={value}
				/>
				{rightSection}
			</>
		);
	};

const renderAsSvg = (mockName: string) =>
// eslint-disable-next-line react/display-name
	function () {
		return <svg>{mockName}</svg>;
	};

const mockCombobox = () => {
	const MockCombobox = ({ children }: PropsWithChildren) => (
		<div data-testid="Combobox">{children}</div>
	);

	MockCombobox.Chevron = renderAsSvg('Combobox.Chevron');
	MockCombobox.Dropdown = renderAsDiv('Combobox.Dropdown');
	MockCombobox.Empty = renderAsDiv('Combobox.Empty');
	MockCombobox.Group = renderAsDiv('Combobox.Group');
	MockCombobox.Options = renderAsDiv('Combobox.Options');
	// eslint-disable-next-line react/display-name
	MockCombobox.Option = function ({ children }: PropsWithChildren) {
		return <option data-testid="Option">{children}</option>;
	};
	MockCombobox.Search = renderAsInput('Combobox.Search');
	MockCombobox.Target = renderAsDiv('Combobox.Target');

	return MockCombobox;
};

const mockScrollArea = () => {
	const MockScrollArea = ({ children }: PropsWithChildren) => (
		<div
			data-testid="ScrollArea"
			style={{
				height: '100%',
				overflow: 'auto',
				width: '100%',
			}}
		>
			{children}
		</div>
	);

	MockScrollArea.Autosize = ({
		children,
		onBottomReached,
	}: ScrollAreaProps) => {
		onBottomReached ? onBottomReached() : null;
		return renderAsDiv('ScrollArea.Autosize')({ children });
	};

	return MockScrollArea;
};

const mockInput = () => {
	const MockInput = () => renderAsInput('Input');

	MockInput.Wrapper = renderAsDiv('InputWrapper');

	return MockInput;
};

const mockPopover = () => {
	const MockPopover = ({ children }: PropsWithChildren) =>
		renderAsDiv('Popover')({ children });

	MockPopover.Target = renderAsDiv('PopoverTarget');
	MockPopover.Dropdown = renderAsDiv('PopoverDropdown');

	return MockPopover;
};

const mockAppShell = () => {
	const MockAppShell = ({ children }: PropsWithChildren) =>
		renderAsDiv('AppShell')({ children });

	MockAppShell.Header = renderAsDiv('AppShellHeader');
	MockAppShell.Main = renderAsDiv('AppShellMain');
	MockAppShell.Navbar = renderAsNav('AppShellNavbar');

	return MockAppShell;
};

export const ActionIconMock = renderAsButton('ActionIcon');
export const AlertMock = renderAsDiv('Alert');
export const AppShellMock = mockAppShell();
export const AvatarMock = renderAsDiv('Avatar');
export const BadgeMock = renderAsDiv('Badge');
export const BreadcrumbsMock = renderAsDiv('Breadcrumbs');
export const ButtonMock = renderAsButton('Button');
export const CenterMock = renderAsDiv('Center');
export const CloseButtonMock = renderAsButton('CloseButton');
export const CloseIconMock = renderAsSvg('CloseIcon');
export const ColorSwatchMock = ({ color }: { color: string }) => (
	<div>{color}</div>
);
export const ComboboxMock = mockCombobox();
export const ComboboxChevronMock = renderAsSvg('ComboboxChevron');
export const ContainerMock = renderAsDiv('Container');
export const DividerMock = renderAsDiv('Divider');
export const DrawerMock = () => {
	const MockDrawer = ({ children }: PropsWithChildren) => renderAsDiv('Drawer')({ children });
	// eslint-disable-next-line react/display-name
	MockDrawer.Header = function({ children }: PropsWithChildren) {
		return <header data-testid="DrawerHeader">{children}</header>;
	};
	return MockDrawer;
};
export const FlexMock = renderAsDiv('Flex');
export const GroupMock = renderAsDiv('Group');
export const IconSearchMock = renderAsButton('IconSearch');
export const InputBaseMock = renderAsDiv('InputBase');
export const InputLabelMock = renderAsLabel('InputLabel');
export const InputMock = mockInput();
export const InputWrapperMock = renderAsDiv('InputWrapper');
export const LoaderMock = renderAsDiv('Loader');
export const MantineColorMock = jest.fn();
export const MenuMock = renderAsDiv('Menu');
export const MenuItemMock = renderAsDiv('MenuItem');
export const MenuTargetMock = renderAsDiv('MenuTarget');
export const ModalMock = ({ children, opened }: ModalProps) => (
	<div data-testid="Modal">{opened ? children : null}</div>
);
export const PaperMock = renderAsDiv('Paper');
export const PopoverMock = mockPopover();
export const PopoverDropdownMock = renderAsDiv('PopoverDropdown');
export const PopoverTargetMock = renderAsDiv('PopoverTarget');
export const RadioMock = renderAsDiv('Radio');
export const remMock = (value: number | undefined) =>
	value ? `${value}px` : null;
export const ScrollAreaMock = mockScrollArea();
export const ScrollAreaAutosizeMock = renderAsDiv('ScrollAreaAutosize');
export const SelectMock = renderAsInput('Select');
export const SimpleGridMock = renderAsDiv('SimpleGrid');
export const SkeletonMock = renderAsDiv('Skeleton');
export const SpaceMock = renderAsDiv('Space');
export const StackMock = renderAsDiv('Stack');
export const StepperMock = ({
	children,
	active,
}: PropsWithChildren<StepperProps>) => (
	<div data-testid="Stepper">
		Active step:
		{active}
		{children}
	</div>
);
export const StepperStepMock = ({
	label,
	description,
}: {
	label: ReactNode;
	description: ReactNode;
}) => (
	<div data-testid="StepperStep">
		{label}
		{description}
	</div>
);
export const SwitchMock = ({ checked, onClick }: SwitchProps) => (
	<div
		data-testid="Switch"
		onClick={onClick}
	>
		<div>{checked + ''}</div>
	</div>
);
export const TabsMock = () => {
	const MockTabs = ({ children }: PropsWithChildren) => renderAsDiv('Tabs')({ children });

	MockTabs.List = renderAsDiv('Tabs.List');
	MockTabs.Tab = renderAsDiv('Tabs.Tab');
	MockTabs.Panel = renderAsDiv('Tabs.Panel');
	return MockTabs;
};
export const ThemeIconMock = renderAsButton('ThemeIcon');
export const TextMock = renderAsP('Text');
export const TextInputMock = renderAsInput('TextInput');
export const TitleMock = renderAsP('Title');
export const TooltipMock = ({ children, label, opened }: TooltipProps) =>
	renderAsDiv('Tooltip')({
		children: (
			<>
				{opened ? label : null}
				{children}
			</>
		),
	});

const mantine = jest.requireActual<typeof import('@mantine/core')>('@mantine/core');

export const mantineMock = {
	...mantine,
	ActionIcon: ActionIconMock,
	Alert: AlertMock,
	AppShell: AppShellMock,
	Avatar: AvatarMock,
	Badge: BadgeMock,
	Breadcrumbs: BreadcrumbsMock,
	Button: ButtonMock,
	Center: CenterMock,
	CloseButton: CloseButtonMock,
	CloseIcon: CloseIconMock,
	ColorSwatch: ColorSwatchMock,
	Combobox: ComboboxMock,
	ComboboxChevron: ComboboxChevronMock,
	Container: ContainerMock,
	Divider: DividerMock,
	Drawer: DrawerMock(),
	Flex: FlexMock,
	Group: GroupMock,
	IconSearch: IconSearchMock,
	Input: InputMock,
	InputBase: InputBaseMock,
	InputLabel: InputLabelMock,
	InputWrapper: InputWrapperMock,
	Loader: LoaderMock,
	MantineColor: MantineColorMock,
	Menu: MenuMock,
	MenuItem: MenuItemMock,
	MenuTarget: MenuTargetMock,
	Modal: ModalMock,
	Paper: PaperMock,
	Popover: PopoverMock,
	PopoverDropdown: PopoverDropdownMock,
	PopoverTarget: PopoverTargetMock,
	Radio: RadioMock,
	ScrollArea: ScrollAreaMock,
	ScrollAreaAutosize: ScrollAreaAutosizeMock,
	Select: SelectMock,
	SimpleGrid: SimpleGridMock,
	Skeleton: SkeletonMock,
	Space: SpaceMock,
	Stack: StackMock,
	Stepper: StepperMock,
	StepperStep: StepperStepMock,
	Switch: SwitchMock,
	Tabs: TabsMock(),
	Text: TextMock,
	TextInput: TextInputMock,
	ThemeIcon: ThemeIconMock,
	Title: TitleMock,
	Tooltip: TooltipMock,
	UnstyledButton: ButtonMock,
	rem: remMock,
};

jest.mock('@mantine/core', () => ({ ...mantineMock }));
