import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
    Button,
    Form,
    FormItem,
    Icon,
    Input,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
    Submenu,
    TabPane,
    Tabs,
    RadioGroup,
    RadioButton,
    Switch,
    Tooltip,
    Tag,
    ButtonGroup,
    MessageBox,
    Radio,
    Upload,
    Progress,
    DatePicker,
    Image,
    Empty,
    Select,
    Option,
    Table,
    TableColumn,
    Popover,
} from 'element-ui';

Vue.use(Popover)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Option)
Vue.use(Select)
Vue.use(Empty)
Vue.use(Image)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(ButtonGroup)
Vue.use(Tooltip)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Container)
Vue.use(Switch)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Button)
Vue.use(Icon)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tabs)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tag)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
