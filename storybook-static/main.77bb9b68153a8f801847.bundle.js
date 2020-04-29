(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{312:function(module,exports,__webpack_require__){__webpack_require__(313),__webpack_require__(459),module.exports=__webpack_require__(460)},377:function(module,exports){},460:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(299);module._StorybookPreserveDecorators=!0,Object(_storybook_html__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(653)],module)}.call(this,__webpack_require__(461)(module))},653:function(module,exports,__webpack_require__){var map={"./molecule.stories.js":654,"./organism.stories.js":656,"./page.stories.js":668};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=653},654:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ImageTile",(function(){return ImageTile}));const{html:html}=__webpack_require__(78),ReactDOM=__webpack_require__(35),ImageTileComponent=__webpack_require__(655);__webpack_exports__.default={title:"Molecules"};const ImageTile=()=>{const container=document.createElement("div");return ReactDOM.render(html` <div style=${{height:"200px",width:"200px"}}>
      <${ImageTileComponent}
        imageUrl="https://images.unsplash.com/photo-1577628208759-4ee69c26dadc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5650&q=80"
      />
    </div>`,container),container}},655:function(module,exports,__webpack_require__){const{Component:Component}=__webpack_require__(0),{html:html}=__webpack_require__(78),Loading=()=>html`<div className="dashboard__tile--loading"></div>`,ImageComponent=({imageUrl:imageUrl,onClick:onClick})=>html` <div style=${(imageUrl=>({height:"100%",width:"100%",borderRadius:"4px",backgroundImage:`url(${imageUrl})`,backgroundRepeat:"no-repeat",backgroundPosition:"center center",backgroundSize:"cover"}))(imageUrl)}></div>`;class ImageTile extends Component{constructor(props){super(props),this.state={loading:!0},this.bgImg=null}componentDidMount(){this.props.imageUrl&&(console.log("asdfs"),this.bgImg=new Image,this.bgImg.src=this.props.imageUrl,this.bgImg.onload=()=>{this.setState({loading:!1})})}render(){return html`
      ${this.state.loading?html`<${Loading} />`:html`<${ImageComponent} imageUrl=${this.props.imageUrl} />`}
    `}}ImageTile.defaultProps={imageUrl:""},module.exports=ImageTile},656:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Header",(function(){return Header})),__webpack_require__.d(__webpack_exports__,"Gallery",(function(){return Gallery}));const{html:html}=__webpack_require__(78),ReactDOM=__webpack_require__(35),HeaderComponent=__webpack_require__(657);__webpack_exports__.default={title:"Organisms"};const Header=()=>{const container=document.createElement("div");return ReactDOM.render(html`<${HeaderComponent}
      onInputChange=${value=>console.log("input: ",value)}
    />`,container),container},Gallery=()=>document.createElement("div")},657:function(module,exports,__webpack_require__){const{html:html}=__webpack_require__(78),PropTypes=__webpack_require__(11),{fade:fade,makeStyles:makeStyles}=__webpack_require__(670),AppBar=__webpack_require__(672).default,Toolbar=__webpack_require__(673).default,Typography=__webpack_require__(674).default,InputBase=__webpack_require__(671).default,SearchIcon=__webpack_require__(665).default,useStyles=makeStyles(theme=>({grow:{flexGrow:1},search:{position:"relative",borderRadius:theme.shape.borderRadius,backgroundColor:fade(theme.palette.common.white,.15),"&:hover":{backgroundColor:fade(theme.palette.common.white,.25)},marginRight:theme.spacing(2),marginLeft:theme.spacing(3),width:"auto"},searchIcon:{padding:theme.spacing(0,1.5),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:{padding:theme.spacing(1,1,1,0),paddingLeft:`calc(1em + ${theme.spacing(4)}px)`,transition:theme.transitions.create("width"),width:"20ch"}})),Header=({onInputChange:onInputChange})=>{const classes=useStyles();return html`
    <div className="${classes.grow}">
      <${AppBar} position="static">
        <${Toolbar}>
          <${Typography} className="{classes.title}" variant="h6" noWrap>
            🛡 Privatus
          <//>
          <div className="${classes.grow}" />
          <div className="${classes.search}">
            <div className="${classes.searchIcon}">
              <${SearchIcon} />
            </div>
            <${InputBase}
              placeholder="Search by tag"
              classes=${{root:classes.inputRoot,input:classes.inputInput}}
              onChange=${e=>onInputChange(e.target.value)}
              inputProps="${{"aria-label":"search"}}"
            />
          </div>
        <//>
      <//>
    </div>
  `};Header.defaultProps={onInputChange:()=>null},Header.propTypes={onInputChange:PropTypes.func},module.exports=Header},668:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"StartPage",(function(){return StartPage}));const{html:html}=__webpack_require__(78),ReactDOM=__webpack_require__(35),StartPageComponent=__webpack_require__(669);__webpack_exports__.default={title:"Pages"};const StartPage=()=>{const container=document.createElement("div");return ReactDOM.render(html`<${StartPageComponent}
      onSelectRootFolderPath=${()=>console.log("select root path")}
    />`,container),container}},669:function(module,exports,__webpack_require__){const{html:html}=__webpack_require__(78),styles={wrapper:{backgroundColor:"pink",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-around"},main:{margin:"auto"}};module.exports=({onSelectRootFolderPath:onSelectRootFolderPath})=>html`<div style=${styles.wrapper}>
    <div style=${styles.main}>
      <h1 className="title is-1" style=${{marginBottom:"80px"}}>
        Welcome to Privatus!
      </h1>
      <p>
        The next gen AI-powered <b>privacy-focused photo experience</b>
        <br />
        Rediscover your photos while <b>keeping your privacy</b> 🛡️
      </p>
      <button onClick=${async()=>await onSelectRootFolderPath()}>
        Select picture folder
      </button>
    </div>
  </div>`}},[[312,1,2]]]);
//# sourceMappingURL=main.77bb9b68153a8f801847.bundle.js.map