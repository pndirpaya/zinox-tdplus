(this["webpackJsonpzinox-tdplus"]=this["webpackJsonpzinox-tdplus"]||[]).push([[0],{43:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(1),i=a.n(c),r=a(29),d=a.n(r),l=a(30),n=a.n(l),j=a(34),u=a(2),h=(a(42),a(31)),o=a.n(h),m=(a(43),a(32)),b=a(9),x=a(10),k=a(15),O=a(12),p=a(11),g=a(33),v=a.n(g),N=a(36),w=a.p+"static/media/tdlogo.20c9be8f.svg",f=a.p+"static/media/loader.ed827ea0.svg",y=new N.a,S=function(e){Object(O.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(b.a)(this,a),(s=t.call(this,e)).state={email:"",password:"",isProcessing:!1,authError:!1},s.handleInputChange=s.handleInputChange.bind(Object(k.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(k.a)(s)),s}return Object(x.a)(a,[{key:"handleInputChange",value:function(e){this.setState(Object(m.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.setState({isProcessing:!0});var t=this,a={email:this.state.email,password:this.state.password};v.a.post("http://localhost:8888/api/tdlogin/",a).then((function(e){204===e.status&&""===e.data?t.setState({authError:!0,isProcessing:!1}):(t.setState({authError:!1}),console.log(e),0===e.data[0].status?(y.set("current_session",e.data[0]._id,{path:"/",expires:new Date(Date.now()+18e5)}),t.props.history.push("/password-change")):2===e.data[0].status?(alert("Your Account is Deactivated.\r\n Kindly Contact Your Zinox Adminstrator For Further Assistance."),t.setState({isProcessing:!1})):(y.set("user_type",e.data[0].user_type,{path:"/",expires:new Date(Date.now()+18e5)}),y.set("current_session",e.data[0]._id,{path:"/",expires:new Date(Date.now()+18e5)}),t.props.history.push("/dashboard")))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("section",{className:"uk-section uk-section-muted","data-uk-height-viewport":!0,children:Object(s.jsx)("div",{className:"uk-container",children:Object(s.jsxs)("div",{className:"uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-text-left",children:[Object(s.jsx)("div",{className:"uk-margin",children:Object(s.jsx)("img",{src:w,alt:"logo",width:"300"})}),Object(s.jsxs)("div",{className:"uk-card uk-card-default uk-card-body ",children:[Object(s.jsx)("p",{children:"You are connecting to:"}),Object(s.jsx)("h4",{className:"uk-text-left orange uk-margin-remove",children:"TDPlus Support Dashboard"}),Object(s.jsxs)("form",{className:"uk-margin-medium-top",method:"POST",onSubmit:this.handleSubmit,children:[this.state.authError&&Object(s.jsx)("div",{className:"uk-alert-danger","data-uk-alert":!0,children:Object(s.jsx)("p",{children:"Error! Incorrect username or password"})}),Object(s.jsx)("div",{className:"uk-margin",children:Object(s.jsx)("input",{className:"uk-input uk-width-medium",type:"text",name:"email",placeholder:"Username (Email)",onChange:this.handleInputChange,required:!0})}),Object(s.jsx)("div",{className:"uk-margin",children:Object(s.jsx)("input",{className:"uk-input uk-width-medium",type:"password",name:"password",placeholder:"Password",onChange:this.handleInputChange,required:!0})}),Object(s.jsxs)("div",{className:"uk-margin",children:[!this.state.isProcessing&&Object(s.jsx)("button",{type:"submit",className:"uk-button uk-button-small uk-width-1-1@m orange_btn",children:"LOGIN"}),this.state.isProcessing&&Object(s.jsxs)("h4",{className:"uk-form-label uk-text-bold ",children:[Object(s.jsx)("img",{className:"uk-margin-right",src:f,width:"40",alt:"loader"})," Verifying Login Details"]})]}),Object(s.jsx)("p",{className:"uk-text-meta orange uk-margin-small serial_example",children:"Forgot your username or password?"})]})]})]})})}),Object(s.jsx)("section",{className:"uk-position-bottom uk-section-default uk-padding-small ",children:Object(s.jsx)("p",{className:"uk-text-left uk-text-bold footer_subtxt uk-margin-remove",children:"\xa9 2020 Zinox Technologies Ltd."})})]})}}]),a}(i.a.Component),_=a.p+"static/media/plus.523d2215.svg",C=a.p+"static/media/search.fdb6876a.svg",D=a.p+"static/media/close.34742b6e.svg",J=a.p+"static/media/report.5f331b2c.svg",T=a.p+"static/media/logout.03c865ab.svg",P=(window.location.href.split("/").pop(),function(e){Object(O.a)(a,e);var t=Object(p.a)(a);function a(){return Object(b.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"uk-visible@s td_nav_bar",children:Object(s.jsxs)("div",{className:"uk-padding-small uk-margin-top",children:[Object(s.jsx)("img",{src:w,width:"180",alt:"tdplus zinox logo"}),Object(s.jsx)("p",{className:"td_nav_bar_title",children:"Dashboard"}),Object(s.jsx)("hr",{}),Object(s.jsxs)("ul",{className:"uk-nav uk-nav-default",children:[Object(s.jsx)("li",{children:Object(s.jsxs)("a",{className:"",href:"/dashboard",children:[Object(s.jsx)("img",{src:_,width:"20",alt:""}),"  Create Job Ticket"]})}),Object(s.jsx)("li",{children:Object(s.jsxs)("a",{className:"",href:"/",children:[Object(s.jsx)("img",{src:C,width:"20",alt:""}),"  Search Job Ticket"]})}),Object(s.jsx)("li",{children:Object(s.jsxs)("a",{className:"",href:"/",children:[Object(s.jsx)("img",{src:D,width:"20",alt:""}),"  Close Job Ticket"]})}),Object(s.jsx)("li",{children:Object(s.jsxs)("a",{className:"",href:"/",children:[Object(s.jsx)("img",{src:J,width:"20",alt:""}),"  Reports"]})}),Object(s.jsx)("li",{children:Object(s.jsxs)("a",{className:"",href:"/logout",children:[Object(s.jsx)("img",{src:T,width:"20",alt:""}),"  Logout"]})})]})]})})}}]),a}(c.Component)),I=a.p+"static/media/plusbtn.69d2cd10.svg",E=a.p+"static/media/jobbtn.91d8805d.svg",A=a.p+"static/media/searchbtn.4bab65cf.svg",L=a.p+"static/media/reportbtn.be10174a.svg",W=a.p+"static/media/closebtn.85a67778.svg",z=function(e){Object(O.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(b.a)(this,a),(s=t.call(this,e)).state={},s}return Object(x.a)(a,[{key:"render",value:function(){return Object(s.jsx)("div",{children:Object(s.jsxs)("section",{className:"uk-grid-small uk-grid-match uk-text-left","data-uk-grid":!0,"data-uk-height-viewport":!0,children:[Object(s.jsx)("div",{className:"uk-width-auto",children:Object(s.jsx)(P,{})}),Object(s.jsx)("div",{className:"uk-width-expand uk-padding-remove",children:Object(s.jsx)("div",{className:"uk-width-1-1",children:Object(s.jsxs)("div",{className:"uk-padding ",children:[Object(s.jsx)("h3",{className:"orange uk-text-bold uk-margin-remove",children:"Hello, TDPlus Administrator  "}),Object(s.jsx)("h5",{className:"uk-text-bold uk-margin-remove",children:" John Doe (joe@tdplus.com)"}),Object(s.jsx)("p",{className:"uk-margin-large-bottom",children:"Welcome to your Dashboard"}),Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsxs)("div",{className:"uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s",children:[Object(s.jsxs)("p",{className:"uk-margin-remove",children:["Open Jobs ",Object(s.jsx)("span",{className:"open_percentage uk-margin-left",children:"63.7%"})]}),Object(s.jsx)("h1",{className:"uk-margin-remove uk-heading-large uk-text-bold ",children:"423"}),Object(s.jsx)("p",{className:"uk-margin-remove",children:"423 Devices"})]}),Object(s.jsxs)("div",{className:"uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s",children:[Object(s.jsxs)("p",{className:"uk-margin-remove",children:["Pending Jobs ",Object(s.jsx)("span",{className:"pending_percentage uk-margin-left",children:"63.7%"})]}),Object(s.jsx)("h1",{className:"uk-margin-remove uk-heading-large uk-text-bold ",children:"423"}),Object(s.jsx)("p",{className:"uk-margin-remove",children:"423 Devices"})]}),Object(s.jsxs)("div",{className:"uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s",children:[Object(s.jsxs)("p",{className:"uk-margin-remove",children:["Jobs On-Hold ",Object(s.jsx)("span",{className:"onhold_percentage uk-margin-left",children:"10.7%"})]}),Object(s.jsx)("h1",{className:"uk-margin-remove uk-heading-large uk-text-bold ",children:"10"}),Object(s.jsx)("p",{className:"uk-margin-remove",children:"423 Devices"})]}),Object(s.jsxs)("div",{className:"uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s",children:[Object(s.jsxs)("p",{className:"uk-margin-remove",children:["Closed Jobs ",Object(s.jsx)("span",{className:"closed_percentage uk-margin-left",children:"63.7%"})]}),Object(s.jsx)("h1",{className:"uk-margin-remove uk-heading-large uk-text-bold ",children:"120"}),Object(s.jsx)("p",{className:"uk-margin-remove",children:"423 Devices"})]})]}),Object(s.jsx)("hr",{className:"uk-margin-medium"}),Object(s.jsxs)("div",{className:"uk-margin-medium-top ","data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-2@m ",children:Object(s.jsx)("a",{href:"/add-product",children:Object(s.jsx)("div",{className:"uk-card uk-card-default uk-card-small uk-card-body uk-text-left tool_card",children:Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-6",children:Object(s.jsx)("img",{src:I,width:"80",alt:"icon"})}),Object(s.jsxs)("div",{className:"uk-width-5-6",children:[Object(s.jsx)("h4",{className:"uk-text-normal uk-margin-small",children:"Create New Job Ticket "}),Object(s.jsx)("p",{className:"uk-text-small uk-margin-small",children:"Verify Online Warranty Status and Create Support Ticket "})]})]})})})}),Object(s.jsx)("div",{className:"uk-width-1-2@m ",children:Object(s.jsx)("a",{href:"/add-product",children:Object(s.jsx)("div",{className:"uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card",children:Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-6",children:Object(s.jsx)("img",{src:E,width:"80",alt:"icon"})}),Object(s.jsxs)("div",{className:"uk-width-5-6",children:[Object(s.jsx)("h4",{className:"uk-text-normal uk-margin-small",children:"Create Job Ticket [ No Serial ]"}),Object(s.jsx)("p",{className:"uk-text-small uk-margin-small",children:"Create a new Job Ticket and Upload Proof of Payment"})]})]})})})}),Object(s.jsx)("div",{className:"uk-width-1-2@m ",children:Object(s.jsx)("a",{href:"/add-product",children:Object(s.jsx)("div",{className:"uk-card uk-card-default uk-card-body  uk-card-small uk-text-left tool_card",children:Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-6",children:Object(s.jsx)("img",{src:A,width:"80",alt:"icon"})}),Object(s.jsxs)("div",{className:"uk-width-5-6",children:[Object(s.jsx)("h4",{className:"uk-text-normal",children:"Search Job Tickets"}),Object(s.jsx)("p",{className:"uk-text-small",children:"Search Support Tickets and Update Status "})]})]})})})}),Object(s.jsx)("div",{className:"uk-width-1-2@m ",children:Object(s.jsx)("a",{href:"/add-product",children:Object(s.jsx)("div",{className:"uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card",children:Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-6",children:Object(s.jsx)("img",{src:W,width:"80",alt:"icon"})}),Object(s.jsxs)("div",{className:"uk-width-5-6",children:[Object(s.jsx)("h4",{className:"uk-text-normal",children:"Close Job Ticket"}),Object(s.jsx)("p",{className:"uk-text-small",children:"Search for Device Warranty and Create Support Ticket "})]})]})})})}),Object(s.jsx)("div",{className:"uk-width-1-2@m ",children:Object(s.jsx)("a",{href:"/add-product",children:Object(s.jsx)("div",{className:"uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card",children:Object(s.jsxs)("div",{"data-uk-grid":!0,children:[Object(s.jsx)("div",{className:"uk-width-1-6",children:Object(s.jsx)("img",{src:L,width:"80",alt:"icon"})}),Object(s.jsxs)("div",{className:"uk-width-5-6",children:[Object(s.jsx)("h4",{className:"uk-text-normal",children:"Reports"}),Object(s.jsx)("p",{className:"uk-text-small",children:"Search and Generate Reports"})]})]})})})})]})]})})})]})})}}]),a}(i.a.Component);var F=function(){return Object(s.jsxs)("div",{className:"uk-padding uk-text-center",children:[Object(s.jsx)("h1",{children:"Page not found"}),Object(s.jsx)("p",{children:"We are sorry this page does not exist"}),Object(s.jsx)("a",{href:"/",children:"Back to Home"})]})};n.a.use(o.a);var H=function(){return Object(s.jsx)(j.a,{children:Object(s.jsx)("div",{children:Object(s.jsxs)(u.c,{children:[Object(s.jsx)(u.a,{path:"/",exact:!0,component:S}),Object(s.jsx)(u.a,{path:"/dashboard",exact:!0,component:z}),Object(s.jsx)(u.a,{component:F})]})})})};d.a.render(Object(s.jsx)(H,{}),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.91bebfad.chunk.js.map