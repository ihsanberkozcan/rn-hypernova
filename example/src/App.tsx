/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { useState, type FC } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  RadioButton,
  RadioGroup,
  Switch,
  TextInput,
  Tooltip,
  Fab,
  Checkbox,
  ThemeProvider,
  type ThemeColors,
  Card,
  Dialog,
  AppBar,
  Slider,
  BarLoader,
  CircularDotsLoader,
  OrbitLoader,
  PulseRingsLoader,
  SquareLoader,
  WaveLoader,
  Snackbar,
  TextArea,
  Skeleton,
} from 'rn-hypernova';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const customTheme: Partial<ThemeColors> = {
  primary: '#137fec',
  secondary: '#2196F3',
  success: '#8BC34A',
  danger: '#F44336',
  warning: '#FFC107',
  info: '#03A9F4',
  dark: '#333333',
  textLight: '#757575',
  border: '#BDBDBD',
};

type Screen =
  | 'menu'
  | 'buttons'
  | 'textinput'
  | 'radiobutton'
  | 'switch'
  | 'checkbox'
  | 'tooltip'
  | 'appbar'
  | 'fab'
  | 'dialog'
  | 'card'
  | 'slider'
  | 'loading'
  | 'snackbar'
  | 'textarea'
  | 'skeleton';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [selectedValue, setSelectedValue] = useState('option1');
  const [singleSelection, setSingleSelection] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [customSwitch, setCustomSwitch] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [fabCounter, setFabCounter] = useState(0);

  const Header: FC<{ title: string }> = ({ title }) => (
    <View style={styles.header}>
      {screen !== 'menu' ? (
        <TouchableOpacity onPress={() => setScreen('menu')} style={styles.back}>
          <MaterialIcons name="arrow-back" size={22} color="#137fec" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.backPlaceholder} />
    </View>
  );

  const Menu = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.menuList}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('buttons')}
        >
          <Text style={styles.menuText}>Buttons</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('textinput')}
        >
          <Text style={styles.menuText}>Text Inputs</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('radiobutton')}
        >
          <Text style={styles.menuText}>Radio Buttons</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('switch')}
        >
          <Text style={styles.menuText}>Switches</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('checkbox')}
        >
          <Text style={styles.menuText}>Checkboxes</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('tooltip')}
        >
          <Text style={styles.menuText}>Tooltips</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('appbar')}
        >
          <Text style={styles.menuText}>AppBar</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('fab')}
        >
          <Text style={styles.menuText}>FAB</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('dialog')}
        >
          <Text style={styles.menuText}>Dialog</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('card')}
        >
          <Text style={styles.menuText}>Card</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('slider')}
        >
          <Text style={styles.menuText}>Slider</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('loading')}
        >
          <Text style={styles.menuText}>Loading</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('snackbar')}
        >
          <Text style={styles.menuText}>Snackbar</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('textarea')}
        >
          <Text style={styles.menuText}>TextArea</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setScreen('skeleton')}
        >
          <Text style={styles.menuText}>Skeleton</Text>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const ButtonsScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Button Examples</Text>

      <Button
        label="Simple Button"
        onPress={() => Alert.alert('Clicked!', 'Simple button was clicked')}
        style={styles.buttonMargin}
      />

      <Button
        label="Icon Button"
        icon={<MaterialIcons name="favorite" size={24} color="white" />}
        onPress={() => Alert.alert('Clicked!', 'Icon button was clicked')}
        style={styles.buttonMargin}
      />

      <Button
        label="Large Button"
        size="large"
        icon={<MaterialIcons name="arrow-forward" size={24} color="white" />}
        iconPosition="right"
        onPress={() => Alert.alert('Clicked!', 'Large button was clicked')}
        style={styles.buttonMargin}
      />

      <Button
        label="Custom Style"
        size="small"
        icon={<MaterialIcons name="star" size={16} color="white" />}
        labelStyle={styles.customLabel}
        onPress={() =>
          Alert.alert('Clicked!', 'Custom styled button was clicked')
        }
      />

      <Button
        label="Disabled Button"
        disabled={true}
        icon={<MaterialIcons name="block" size={24} color="white" />}
        onPress={() => Alert.alert('Clicked!', 'You will not see this message')}
        style={styles.buttonMargin}
      />
    </ScrollView>
  );

  const TextInputScreen = () => {
    const [textValue, setTextValue] = useState('');
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>TextInput Examples</Text>

        <TextInput
          label="Simple Input"
          placeholder="Type something..."
          value={textValue}
          onChangeText={setTextValue}
        />

        <TextInput
          label="Input with Icons"
          placeholder="Search..."
          value={textValue}
          onChangeText={setTextValue}
          leftIcon={<MaterialIcons name="search" size={24} color="#999" />}
          rightIcon={
            <TouchableOpacity onPress={() => setTextValue('')}>
              <MaterialIcons name="clear" size={24} color="#999" />
            </TouchableOpacity>
          }
        />

        <TextInput
          label="Error Input"
          placeholder="Your email address..."
          error="Invalid email address"
          value="test@"
        />

        <TextInput
          label="Disabled Input"
          placeholder="This input is disabled..."
          disabled
          value="Read-only value"
        />
      </ScrollView>
    );
  };

  const RadioScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>RadioButton Examples</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Single RadioButton:</Text>
        <RadioButton
          label="Single Selection"
          value="single"
          selected={singleSelection}
          onSelect={() => setSingleSelection(!singleSelection)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>RadioGroup:</Text>
        <RadioGroup
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        >
          <RadioButton label="Option 1" value="option1" />
          <RadioButton label="Option 2" value="option2" size={24} />
          <RadioButton label="Option 3" value="option3" disabled={true} />
        </RadioGroup>
      </View>
    </ScrollView>
  );

  const SwitchScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Switch Examples</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Simple Switch:</Text>
        <Switch value={switchValue} onValueChange={setSwitchValue} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Customized Switch:</Text>
        <Switch
          value={customSwitch}
          onValueChange={setCustomSwitch}
          size="large"
          thumbColor="#fff"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Disabled Switch:</Text>
        <Switch value={true} disabled={true} />
      </View>
    </ScrollView>
  );

  const CheckboxScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Checkbox Examples</Text>

      <View style={styles.section}>
        <Checkbox
          label="Simple Checkbox"
          checked={checkboxValue}
          onPress={setCheckboxValue}
        />
      </View>

      <View style={styles.section}>
        <Checkbox label="Custom Colored Checkbox" checked={true} size={28} />
      </View>

      <View style={styles.section}>
        <Checkbox label="Disabled Checkbox" checked={true} disabled={true} />
      </View>
    </ScrollView>
  );

  const TooltipScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Tooltip Examples</Text>

      <View style={styles.tooltipContainer}>
        <Tooltip content="Tooltip shown above" position="top">
          <Text style={styles.tooltipTrigger}>Tooltip Top</Text>
        </Tooltip>

        <Tooltip content="Tooltip shown below" position="bottom">
          <Text style={styles.tooltipTrigger}>Tooltip Bottom</Text>
        </Tooltip>

        <Tooltip content="Custom styled tooltip">
          <Text style={styles.tooltipTrigger}>Custom Tooltip</Text>
        </Tooltip>
      </View>
    </ScrollView>
  );

  const AppBarScreen = () => (
    <View style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="Example AppBar"
        leftIcon={<MaterialIcons name="menu" size={24} color="#fff" />}
        rightIcon={<MaterialIcons name="search" size={24} color="#fff" />}
        onLeftPress={() => Alert.alert('Left', 'Menu pressed')}
        onRightPress={() => Alert.alert('Right', 'Search pressed')}
      />
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>AppBar Usage</Text>
        <Text>Simple AppBar with left/right icons.</Text>
      </ScrollView>
    </View>
  );

  const FABScreen = () => (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>FAB Examples</Text>
        <Text>Tap the floating button to increment the counter.</Text>
        <View style={{ height: 20 }} />
        <Text>Counter: {fabCounter}</Text>
      </ScrollView>

      <Fab
        icon={<MaterialIcons name="add" size={24} color="#fff" />}
        onPress={() => setFabCounter((c) => c + 1)}
        style={styles.fab}
      />
    </View>
  );

  const DialogScreen = () => (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Dialog Examples</Text>
        <Button label="Open Dialog" onPress={() => setDialogVisible(true)} />
      </ScrollView>

      <Dialog
        visible={dialogVisible}
        title="Confirm Action"
        onCancel={() => setDialogVisible(false)}
        onConfirm={() => {
          setDialogVisible(false);
          Alert.alert('Confirmed', 'You confirmed the action.');
        }}
        confirmLabel="Yes"
        cancelLabel="No"
      >
        <Text>Are you sure you want to proceed?</Text>
      </Dialog>
    </View>
  );

  const CardScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Card Examples</Text>

      <Card title="Simple Card" subtitle="Subtitle">
        <Text>This is a simple card content.</Text>
      </Card>

      <Card
        title="Clickable Card"
        onPress={() => Alert.alert('Card', 'Card pressed')}
      >
        <Text>Pressing this card triggers an action.</Text>
      </Card>

      <Card title="Custom Content">
        <Button
          label="Action Button"
          onPress={() => Alert.alert('Action', 'Button in card pressed')}
        />
      </Card>
    </ScrollView>
  );
  const SliderScreen = () => {
    const [basicValue, setBasicValue] = useState(50);
    const [stepValue, setStepValue] = useState(25);
    const [customValue, setCustomValue] = useState(75);

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Slider Examples</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Basic Slider:</Text>
          <Text>Value: {basicValue}</Text>
          <View style={{ height: 8 }} />
          <Slider
            value={basicValue}
            onValueChange={setBasicValue}
            minimumValue={0}
            maximumValue={100}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Step Slider (step: 25):</Text>
          <Text>Value: {stepValue}</Text>
          <View style={{ height: 8 }} />
          <Slider
            value={stepValue}
            onValueChange={setStepValue}
            minimumValue={0}
            maximumValue={100}
            step={25}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Custom Colored Slider:</Text>
          <Text>Value: {customValue}</Text>
          <View style={{ height: 8 }} />
          <Slider
            value={customValue}
            onValueChange={setCustomValue}
            minimumValue={0}
            maximumValue={100}
            trackColor="#4de91eff"
            thumbColor="#286d3fff"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Disabled Slider:</Text>
          <Slider value={60} disabled={true} />
        </View>
      </ScrollView>
    );
  };

  const LoadingScreen = () => (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.allLoading}>
        <Text style={styles.label}>Circular Dots</Text>
        <View style={styles.loaderItem}>
          <CircularDotsLoader size={50} dotSize={8} />
        </View>
        <Text style={styles.label}>Circular Dots Custom Color</Text>
        <View style={styles.loaderItem}>
          <CircularDotsLoader size={50} dotSize={8} color="red" />
        </View>

        <Text style={styles.label}>Wave</Text>
        <View style={styles.loaderItem}>
          <WaveLoader dotCount={5} />
        </View>

        <Text style={styles.label}>Pulse Rings</Text>
        <View style={styles.loaderItem}>
          <PulseRingsLoader size={80} />
        </View>

        <Text style={styles.label}>Bar</Text>
        <View style={styles.loaderItem}>
          <BarLoader barCount={5} />
        </View>

        <Text style={styles.label}>Orbit</Text>
        <View style={styles.loaderItem}>
          <OrbitLoader size={60} />
        </View>

        <Text style={styles.label}>Square</Text>
        <View style={styles.loaderItem}>
          <SquareLoader size={50} />
        </View>
      </View>
    </ScrollView>
  );

  const SnackbarScreen = () => {
    const [simpleVisible, setSimpleVisible] = useState(false);
    const [actionVisible, setActionVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Snackbar Examples</Text>

        <View style={styles.section}>
          <Button
            label="Show Simple Snackbar"
            onPress={() => setSimpleVisible(true)}
          />
        </View>

        <View style={styles.section}>
          <Button
            label="Show Snackbar with Action"
            onPress={() => setActionVisible(true)}
          />
        </View>

        <Snackbar
          visible={simpleVisible}
          message="This is a simple snackbar"
          onDismiss={() => setSimpleVisible(false)}
        />

        <Snackbar
          visible={actionVisible}
          message="Message archived"
          action={{
            label: 'Undo',
            onPress: () => {
              setActionVisible(false);
              Alert.alert('Action', 'Undo pressed');
            },
          }}
          onDismiss={() => setActionVisible(false)}
        />
      </View>
    );
  };

  const TextAreaScreen = () => {
    const [text, setText] = useState('');

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>TextArea Examples</Text>

        <TextArea
          label="Simple TextArea"
          placeholder="Type your message here..."
          value={text}
          onChangeText={setText}
          maxLength={250}
        />

        <TextArea
          label="With Error"
          placeholder="Type something..."
          error="This field is required"
          maxLength={250}
        />

        <TextArea
          label="Disabled TextArea"
          placeholder="This input is disabled..."
          value="Read-only content"
          disabled
          maxLength={250}
        />
      </ScrollView>
    );
  };

  const SkeletonScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Skeleton Examples</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Text Skeleton:</Text>
        <Skeleton variant="text" width="80%" />
        <View style={{ height: 8 }} />
        <Skeleton variant="text" width="60%" />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Circle Skeleton:</Text>
        <Skeleton variant="circle" width={60} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Rectangle Skeleton:</Text>
        <Skeleton width="100%" height={120} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Card Loading Example:</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Skeleton variant="circle" width={40} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Skeleton variant="text" width="50%" />
              <View style={{ height: 8 }} />
              <Skeleton variant="text" width="30%" />
            </View>
          </View>
          <View style={{ marginTop: 12 }}>
            <Skeleton height={200} />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={customTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            title={screen === 'menu' ? 'RN Hypernova' : screen.toUpperCase()}
          />
          {screen === 'menu' && <Menu />}
          {screen === 'buttons' && <ButtonsScreen />}
          {screen === 'textinput' && <TextInputScreen />}
          {screen === 'radiobutton' && <RadioScreen />}
          {screen === 'switch' && <SwitchScreen />}
          {screen === 'checkbox' && <CheckboxScreen />}
          {screen === 'tooltip' && <TooltipScreen />}
          {screen === 'appbar' && <AppBarScreen />}
          {screen === 'fab' && <FABScreen />}
          {screen === 'dialog' && <DialogScreen />}
          {screen === 'card' && <CardScreen />}
          {screen === 'slider' && <SliderScreen />}
          {screen === 'loading' && <LoadingScreen />}
          {screen === 'snackbar' && <SnackbarScreen />}
          {screen === 'textarea' && <TextAreaScreen />}
          {screen === 'skeleton' && <SkeletonScreen />}
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  back: {
    width: 40,
    alignItems: 'flex-start',
  },
  backPlaceholder: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    paddingTop: 20,
  },
  menuList: {
    marginTop: 8,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
  },
  buttonMargin: {
    marginVertical: 8,
  },
  customButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  customLabel: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionDivider: {
    marginVertical: 20,
  },
  tooltipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tooltipTrigger: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  loadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  loadingExample: {
    alignItems: 'center',
  },
  allLoading: {
    marginTop: 20,
  },
  loaderItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 20,
    height: 100,
  },
  label: {
    marginBottom: 25,
    fontSize: 16,
    color: '#666',
    fontWeight: '800',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
