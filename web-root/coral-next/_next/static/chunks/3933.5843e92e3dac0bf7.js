"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3933],{23933:function(e,t,n){n.r(t),n.d(t,{default:function(){return QuickSearchOnlyHotel_QuickSearchOnlyHotel}});var l=n(85893),a=n(67294),r=n(12223),i=n(79533),c=n(40119),o=n(82729),s=n(94589),u=n(89619),h=n(19244);function _templateObject(){let e=(0,o._)(["\n  // background-color: ",";\n  color: ",";\n  display: flex;\n  align-items: center;\n  > span {\n    display: flex;\n    align-items: center;\n    svg {\n      margin-right: 8px;\n    }\n  }\n  color: ",";\n  display: flex;\n  align-items: center;\n  > span {\n    display: flex;\n    align-items: center;\n    svg {\n      margin-right: 8px;\n    }\n  }\n"]);return _templateObject=function(){return e},e}function _templateObject1(){let e=(0,o._)(["\n  #OnlyHotelArrivalLocationDropdownContainer {\n    .badge-container {\n      > div {\n        max-width: 280px;\n      }\n    }\n    .ant-select-selection-item-content {\n      max-width: 280px;\n    }\n  }\n  .isLoading {\n    opacity: 0.5;\n    cursor: none;\n  }\n"]);return _templateObject1=function(){return e},e}function _templateObject2(){let e=(0,o._)([""]);return _templateObject2=function(){return e},e}function _templateObject3(){let e=(0,o._)(["\n  position: relative;\n"]);return _templateObject3=function(){return e},e}function _templateObject4(){let e=(0,o._)(["\n  margin-top: 18px;\n"]);return _templateObject4=function(){return e},e}function _templateObject5(){let e=(0,o._)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-gap: 10px;\n"]);return _templateObject5=function(){return e},e}function _templateObject6(){let e=(0,o._)(["\n  display: block;\n  margin-bottom: 21px;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 12px;\n  text-transform: capitalize;\n  color: #141416;\n"]);return _templateObject6=function(){return e},e}(0,s.ZP)(h.Z).withConfig({componentId:"sc-a7f27a7b-0"})(_templateObject(),e=>e.theme.antd.colorWarningBgHover,e=>e.theme.antd.colorTextLightSolid,e=>e.theme.antd.colorTextLightSolid);let d=s.ZP.div.withConfig({componentId:"sc-a7f27a7b-1"})(_templateObject1()),p=(0,s.ZP)(u.Z).withConfig({componentId:"sc-a7f27a7b-2"})(_templateObject2()),S=(0,s.ZP)(r.Z).withConfig({componentId:"sc-a7f27a7b-3"})(_templateObject3());s.ZP.div.withConfig({componentId:"sc-a7f27a7b-4"})(_templateObject4()),s.ZP.div.withConfig({componentId:"sc-a7f27a7b-5"})(_templateObject5()),s.ZP.span.withConfig({componentId:"sc-a7f27a7b-6"})(_templateObject6());var y=n(14823),g=n(72545),m=n(64373),f=n(3352),k=n(40789),O=n(17480),v=n(27342),C=n(36921),H=n(5233),Q=n(76325),_=n(55556),x=n(37117),b=n(77549),D=n(69651),A=n(83549),j=n(42238),w=n(18720),QuickSearchOnlyHotelArrivalLocation_logic=e=>{let{isMobile:t}=(0,c.Z)(),n=(0,a.useRef)(null),closeDestinationSelectModal=()=>{var e;null==n||null===(e=n.current)||void 0===e||e.setShowModalStatus(!1)},r=(0,b.C)(D.NS),i=(0,b.C)(D.h_),{meta:o,configurations:s,widgetData:u}=e,{pageType:h}=o,d=u.onlyHotelPriceSearchListDataRequest,p=(0,b.T)(),{t:S}=(0,H.$G)(),[y,g]=(0,a.useState)(i),m=(0,j.Z)((0,w.Z)("QuickSearchConfigurations.ArrivalLocation.ShowCountryTags",s)),f=(0,w.Z)("QuickSearchConfigurations.CountryPopoverSelectAll",s),O=(0,w.Z)("QuickSearchConfigurations.ArrivalLocation.MaxSelect",s),v=(0,w.Z)("QuickSearchConfigurations.ShowSmartSearch",s),C=(0,w.Z)("QuickSearchConfigurations.ShowDestinationSelect",s),L=(0,w.Z)("QuickSearchConfigurations.OnlyHotelShowPopularDestinations",s),P=(0,w.Z)("QuickSearchConfigurations.ShowResponsiveClearAndApplyButtons",s),Z=(0,w.Z)("PackageTourHotelProduct.PackageSearchProvider",s),B=Z.SelectedValues[0]===x.L.packageFlex,R=S("QuickSearch.Where"),I=S("QuickSearch.DestinationPopperPlaceholder"),checkErrorClass=()=>{let e=document.getElementById("QuickSearchOnlyHotelArrivalLocation");e&&(0,A.W)("QuickSearchOnlyHotelArrivalLocation","alert-active")},updateSelectedArrivalLocations=e=>{p((0,D.QV)(e)),checkErrorClass()},getListCountryPopover=async()=>{let e=await _.NS.OnlyHotelListCountryPopover({id:""});return e.result.data};async function getArrivalLocation(e){let t=await p((0,D.A1)({text:e})).then(e=>e.payload).then(e=>{let t=null==e?void 0:e.map(e=>({label:e.name,value:e.id,type:e.type,title:e.name,id:e.id,name:e.name,nearestAirports:e.nearestAirports,parent:e.parent,children:e.children,friendlyUrl:e.friendlyUrl}));return t||[]});return t}return(0,a.useEffect)(()=>{d&&(null==d?void 0:d.arrivalLocations)&&p((0,D.QV)(null==d?void 0:d.arrivalLocations)),L&&p((0,D.I1)())},[d]),(0,a.useEffect)(()=>{g(i)},[i]),{pageType:h,arrivalLocationCountryPopoverSelectAll:f,arrivalLocationMaxSelectValue:O,arrivalLocationShowSmartSearch:v,listPopularArrivalLocationSelector:r,getArrivalLocation,placeHolder:I,getListCountryPopover,title:R,packageFlex:B,updateSelectedArrivalLocations,arrivalLocation:i,onlyHotelPriceSearchListData:d,isMobile:t,destinationSelectModalRef:n,openDestinationSelectModal:()=>{var e;null==n||null===(e=n.current)||void 0===e||e.setShowModalStatus(!0)},closeDestinationSelectModal,RenderSelectedArrivalLocations:()=>{var e,t;return i?(null==i?void 0:i.length)===0?(0,l.jsx)(k.Z,{className:"selected-area",children:(0,l.jsx)(k.Z,{className:"placeholder",children:I})}):(null==i?void 0:i.length)===1?(0,l.jsx)(k.Z,{className:"selected-area",children:(0,l.jsx)(k.Z,{className:"selected-location",children:null===(t=i[0])||void 0===t?void 0:t.name})}):(0,l.jsxs)(k.Z,{className:"selected-area",children:[(0,l.jsx)(k.Z,{className:"selected-location",children:null===(e=i[0])||void 0===e?void 0:e.name}),(0,l.jsxs)(k.Z,{className:"additional-count",children:["+",i.length-1]})]}):(0,l.jsx)(Q.H,{})},onApplyButtonForMobileModal:()=>{updateSelectedArrivalLocations(y),closeDestinationSelectModal()},arrivalLocationState:y,setArrivalLocationState:g,showResponsiveClearAndApplyButtons:P,arrivalLocationShowDestinationSelect:C,arrivalLocationShowCountryTags:m}},L=n(73565),P=n(827);function QuickSearchOnlyHotelArrivalLocation_styled_templateObject(){let e=(0,o._)(["\n      color: white;\n      .arrival-wrapper {\n        ","\n      }\n\n      .ant-select-selector {\n        ","\n      }\n    "]);return QuickSearchOnlyHotelArrivalLocation_styled_templateObject=function(){return e},e}function QuickSearchOnlyHotelArrivalLocation_styled_templateObject1(){let e=(0,o._)(["\n              color: rgba(255, 255, 255, 0.5) !important;\n            "]);return QuickSearchOnlyHotelArrivalLocation_styled_templateObject1=function(){return e},e}function QuickSearchOnlyHotelArrivalLocation_styled_templateObject2(){let e=(0,o._)(["\n      .destination-modal-container {\n        height: 100%;\n        width: calc(100% - 46px);\n        z-index: 6;\n        display: flex;\n        align-items: center;\n        padding-left: 12px;\n        .selected-area {\n          margin-left: 8px;\n          font-size: 14px;\n          font-weight: 400;\n          line-height: 22px;\n          display: flex;\n          align-items: center;\n          width: calc(100% - 60px);\n          .placeholder {\n            color: ",";\n\n            ","\n          }\n          .selected-location {\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            overflow: hidden;\n          }\n          .additional-count {\n            width: 10px;\n            margin-left: 4px;\n          }\n        }\n      }\n    "]);return QuickSearchOnlyHotelArrivalLocation_styled_templateObject2=function(){return e},e}function QuickSearchOnlyHotelArrivalLocation_styled_templateObject3(){let e=(0,o._)(["\n  ","\n\n  .alert-active {\n    border: 1px solid "," !important;\n  }\n\n  .arrival-wrapper {\n    height: 46px;\n    display: flex;\n    border: 1px solid ",";\n    border-radius: ","px;\n    overflow: hidden;\n    margin: 0;\n    padding: 0;\n    justify-content: space-between;\n    position: relative;\n    transition: all 0.2s;\n    &:hover {\n      border: 1px solid ",";\n    }\n    .popover-wrapper {\n      border: none;\n    }\n  }\n  ","\n"]);return QuickSearchOnlyHotelArrivalLocation_styled_templateObject3=function(){return e},e}let Z=s.ZP.div.withConfig({componentId:"sc-83e51cba-0"})(QuickSearchOnlyHotelArrivalLocation_styled_templateObject3(),e=>e.theme.isV2&&(0,L.gw)()&&(0,s.iv)(QuickSearchOnlyHotelArrivalLocation_styled_templateObject(),(0,P.t)(),(0,P.t)(!0)),e=>e.theme.antd.colorError,e=>e.theme.antd.colorBorder,e=>2*e.theme.antd.borderRadius,e=>e.theme.antd.colorPrimaryBorderHover,e=>e.theme.screen.isMobile&&(0,s.iv)(QuickSearchOnlyHotelArrivalLocation_styled_templateObject2(),e.theme.antd.colorTextPlaceholder,e.theme.isV2&&(0,s.iv)(QuickSearchOnlyHotelArrivalLocation_styled_templateObject1())));var QuickSearchOnlyHotel_QuickSearchOnlyHotelArrivalLocation_QuickSearchOnlyHotelArrivalLocation=e=>{let{pageType:t,arrivalLocationCountryPopoverSelectAll:n,arrivalLocationMaxSelectValue:a,arrivalLocationShowSmartSearch:r,listPopularArrivalLocationSelector:i,getArrivalLocation:c,placeHolder:o,getListCountryPopover:s,title:u,packageFlex:h,updateSelectedArrivalLocations:d,arrivalLocation:p,onlyHotelPriceSearchListData:S,isMobile:H,destinationSelectModalRef:Q,openDestinationSelectModal:_,closeDestinationSelectModal:x,RenderSelectedArrivalLocations:b,onApplyButtonForMobileModal:D,arrivalLocationState:A,setArrivalLocationState:j,showResponsiveClearAndApplyButtons:w,arrivalLocationShowDestinationSelect:L,arrivalLocationShowCountryTags:P}=QuickSearchOnlyHotelArrivalLocation_logic(e);return(0,l.jsxs)(Z,{"data-testid":"quickSearchOnlyHotelArrivalLocationBlock",children:[(0,C.K)(t)&&(0,l.jsx)("div",{className:"quick-searchBar-title",children:(0,l.jsx)("div",{children:(0,l.jsx)("span",{children:u})})}),(0,l.jsxs)(k.Z,{id:"QuickSearchOnlyHotelArrivalLocation",className:"arrival-wrapper",children:[(0,l.jsx)(m.Z,{onCancel:x,refObject:Q,updateSelectedArrivalLocations:d,onApplyButtonForMobileModal:D,showResponsiveClearAndApplyButtons:w,renderComponent:(0,l.jsx)(g.Z,{selectedArrivalLocations:A,popularArrivalLocations:i,maxSelectableCountry:a,updateArrivalLocations:d,fetchOptions:c,placeholder:o,validation:!1,productType:v.B.onlyHotel,showSelectAll:n,showResponsiveClearAndApplyButtons:w,setArrivalLocationState:j})}),H&&L&&(0,l.jsxs)(k.Z,{className:"destination-modal-container",onClick:_,children:[(0,l.jsx)(O.Z,{icon:y.Z,className:"search-icon"}),(0,l.jsx)(b,{})]}),L&&!H&&(0,l.jsx)(g.Z,{selectedArrivalLocations:A,popularArrivalLocations:i,maxSelectableCountry:a,updateArrivalLocations:d,fetchOptions:c,placeholder:o,validation:!1,productType:v.B.onlyHotel,showSelectAll:n,showResponsiveClearAndApplyButtons:w,setArrivalLocationState:j}),r&&(0,l.jsx)(f.Z,{id:"QuickSearchOnlyHotelArrivalLocation",showSelectAll:n,getListCountryPopover:s,maxSelectableCountry:a,fetchOptions:c,updateArrivalLocations:d,selectedArrivalLocations:p,showSmartSearch:r,packageFlex:h,pageType:t,priceSearchListData:S,productType:v.B.onlyHotel,validation:!1,renderSelectedPlaceholder:b,showDestinationSelect:L,showCountryTags:P})]})]})},B=n(58701),R=n(71202),I=n(27484),T=n.n(I),M=n(92823),N=n(22363),QuickSearchOnlyHotelMultiDatePicker_logic=e=>{let{isMobile:t}=(0,c.Z)(),n=(0,b.C)(D.Yp),l=(0,b.C)(D.WG),r=(0,b.C)(M.LI),{meta:i,configurations:o,widgetData:s}=e,{pageType:u}=i,h=s.onlyHotelPriceSearchListDataRequest,{t:d}=(0,H.$G)(),p=(0,b.T)(),S="range",y=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultDepartureDailyPeriod",o),g=new Date,m=new Date().setDate(g.getDate()),f=new Date().setDate(g.getDate()+y),[k,O]=(0,a.useState)([null,null]),v=(0,w.Z)("QuickSearchConfigurations.ShowButtons",o),C=(0,w.Z)("QuickSearchConfigurations.ShowMinPrice",o),Q=(0,w.Z)("QuickSearchConfigurations.MultiDatePicker.AutoApply",o),_=(0,w.Z)("QuickSearchConfigurations.MultiDatePicker.RangeLimit",o),x=(0,w.Z)("QuickSearchConfigurations.ShowResponsiveClearAndApplyButtons",o),j=d("QuickSearch.ChooseDate"),L=d("QuickSearch.MultiDatePicker.PriceInfoMessage"),P=d("QuickSearch.ChooseDepartureDate"),Z=d(t?"QuickSearch.CharterFlightMobile":"QuickSearch.CharterFlight"),B=d(t?"QuickSearch.RegularFlightMobile":"QuickSearch.RegularFlight"),I=d("QuickSearch.AllFilterLabel"),F=d("Common.Apply"),q=d("QuickSearch.ClearEverything"),V=d("QuickSearch.DatesOfStay"),handleDatePickerChange=(e,t)=>{let[n,l]=[null,null];e&&([n,l]=e);let a=null==n?void 0:n.format(R.sF),r=null==l?void 0:l.format(R.sF);(0,N.aH)(a)&&(0,N.aH)(r)?p((0,D.EC)({endDate:null,startDate:null,mode:S})):a&&r&&p((0,D.EC)({endDate:r,startDate:a,mode:t}))};return(0,a.useEffect)(()=>{if(h&&(null==h?void 0:h.beginDates[0])){let e=new Date(T()().format(R.sF)).getTime(),t=new Date(T()().format(R.sF)).getTime();t=new Date(null==h?void 0:h.beginDates[0]).getTime();let n=T()(null==h?void 0:h.beginDates[0]).format(R.sF),l=T()(null==h?void 0:h.beginDates[1]).format(R.sF),a=[T()(n),T()(l)];t>=e&&(handleDatePickerChange(a,S),O([T()(n),T()(l)]))}else{let e=[T()(m),T()(f)];handleDatePickerChange(e,S),O([T()(m),T()(f)])}},[h]),(0,a.useEffect)(()=>{let e=T()(null==k?void 0:k[0]).format(R.sF),t=T()(null==k?void 0:k[1]).format(R.sF);e!==l.startDate&&t!==l.endDate&&(0,N.rt)(l.startDate)&&(0,N.rt)(l.endDate)&&O([T()(l.startDate),T()(l.endDate)])},[l]),{pageType:u,availableFlightDates:n,changeDateValue:k,handleDatePickerChange,enableAvailability:!1,UseFlightTypeLogic:!1,showLabelsInsidePanel:!0,multiple:!1,autoApply:Q,rangeLimit:_,placeholder:j,priceInfoText:L,pickerTitle:P,charterFilterLabel:Z,regularFilterLabel:B,allFilterLabel:I,applyButtonText:F,clearButtonText:q,mode:S,datepickerShowButtons:v,showHeader:!1,datepickerShowMinPrices:C,title:V,removeClassForError:()=>{(0,A.W)("QuickSearchOnlyHotelMultiDatePicker","alert-active")},showResponsiveClearAndApplyButtons:x,overlayQuickSearchSelector:r}};function QuickSearchOnlyHotelMultiDatePicker_styled_templateObject(){let e=(0,o._)(["\n      color: white;\n\n      .ant-input-affix-wrapper {\n        ","\n      }\n    "]);return QuickSearchOnlyHotelMultiDatePicker_styled_templateObject=function(){return e},e}function QuickSearchOnlyHotelMultiDatePicker_styled_templateObject1(){let e=(0,o._)(["\n  &.alert-active {\n    .ant-input-affix-wrapper {\n      border: 1px solid ",";\n    }\n  }\n\n  ","\n"]);return QuickSearchOnlyHotelMultiDatePicker_styled_templateObject1=function(){return e},e}let F=s.ZP.div.withConfig({componentId:"sc-d6e67e68-0"})(QuickSearchOnlyHotelMultiDatePicker_styled_templateObject1(),e=>e.theme.antd.colorError,e=>e.theme.isV2&&(0,L.gw)()&&(0,s.iv)(QuickSearchOnlyHotelMultiDatePicker_styled_templateObject(),(0,P.t)()));var QuickSearchOnlyHotel_QuickSearchOnlyHotelMultiDatePicker_QuickSearchOnlyHotelMultiDatePicker=e=>{let{pageType:t,changeDateValue:n,handleDatePickerChange:a,enableAvailability:r,UseFlightTypeLogic:i,showLabelsInsidePanel:c,multiple:o,autoApply:s,rangeLimit:u,placeholder:h,priceInfoText:d,pickerTitle:p,charterFilterLabel:S,regularFilterLabel:y,allFilterLabel:g,applyButtonText:m,clearButtonText:f,mode:k,showHeader:O,datepickerShowMinPrices:v,title:H,removeClassForError:Q,showResponsiveClearAndApplyButtons:_,overlayQuickSearchSelector:x}=QuickSearchOnlyHotelMultiDatePicker_logic(e);return(0,l.jsxs)(F,{id:"QuickSearchOnlyHotelMultiDatePicker","data-testid":"quickSearchOnlyHotelMultiDatePickerBlock",children:[(0,C.K)(t)&&(0,l.jsx)("div",{className:"quick-searchBar-title",children:(0,l.jsx)("span",{children:H})}),(0,l.jsx)(B.Z,{defaultOpen:x,value:n,handleChange:a,enableAvailability:r,useFlightTypeLogic:i,showLabelsInsidePanel:c,multiple:o,placeholder:h,showHeader:O,showPrices:v,priceInfoText:d,mode:k,format:R.Lj,autoApply:s,rangeLimit:u,pickerTitle:p,charterFilterLabel:S,regularFilterLabel:y,allFilterLabel:g,applyButtonText:m,clearButtonText:f,removeClassForError:Q,forceToRange:!0,showResponsiveClearAndApplyButtons:_})]})},q=n(21908),V=n(77879),QuickSearchOnlyHotelPassengerSelect_logic=e=>{let t=(0,b.C)(D.RU),n=(0,b.C)(D.C_),l=(0,b.C)(D.jL),{configurations:r,meta:i,widgetData:c}=e,{pageType:o}=i,s=c.onlyHotelPriceSearchListDataRequest,{t:u}=(0,H.$G)(),h=(0,b.T)(),d=(0,w.Z)("QuickSearchConfigurations.AutoApply",r),p=(0,w.Z)("QuickSearchConfigurations.ShowBirthdateCalendar",r),S=(0,w.Z)("QuickSearchConfigurations.ShowClearButton",r),y=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultAdultAge",r),g=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultChildAge",r),m=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MaximumAdultAge",r),f=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MaximumChildAge",r),k=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MinimumAdultAge",r),O=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MinimumChildAge",r),v=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultAdultCount",r),C=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultChildCount",r),Q=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MaximumAdultCount",r),_=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MaximumChildCount",r),x=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MinimumAdultCount",r),A=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.MinimumChildCount",r),j=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultAdultBirthdate",r),L=(0,w.Z)("QuickSearchConfigurations.OnlyHotel.DefaultChildBirthdate",r),P=(0,w.Z)("QuickSearchConfigurations.ShowResponsiveClearAndApplyButtons",r),Z={defaultAge:y,defaultNumber:v,max:Q,maxAge:m,min:x,minAge:k,title:u("QuickSearch.Adults"),defaultBirthdate:j},B={defaultAge:g,defaultNumber:C,max:_,maxAge:f,min:O,minAge:A,title:u("QuickSearch.Children"),defaultBirthdate:L},R=u("QuickSearch.SelectDate"),I=u("QuickSearch.PopoverInformation"),M=u("Common.Apply"),N=u("QuickSearch.ClearEverything"),F=u("QuickSearch.Travelers"),updatePassengerSelect=(e,t)=>{h((0,D.fO)({AdultsInfo:e,ChildrenInfo:t}));let n=e.map(e=>({age:e.age,passengerType:V.B.adult})),l=t.map(e=>({age:!1===p?e.age:null,passengerType:V.B.child,birthDate:!1===p?null:e.birthDate}));h((0,D.n7)([...n,...l]))},setDefaults=()=>{let e=Array(Z.defaultNumber).fill({age:Z.defaultAge,title:"Adult",type:"adult",birthDate:Z.defaultBirthdate}),t=Array(B.defaultNumber).fill({age:B.defaultAge,title:"Child",type:"child",birthDate:B.defaultBirthdate});h((0,D.K9)(!0)),updatePassengerSelect(e,t)};return(0,a.useEffect)(()=>{var e;if(s&&(null==s?void 0:null===(e=s.roomCriterias[0])||void 0===e?void 0:e.passengers)){let e=null==s?void 0:s.roomCriterias[0].passengers,t=[],n=[];e.forEach(e=>{e.passengerType===V.B.adult?t.push(e):n.push(e)}),updatePassengerSelect(t,n)}else l||setDefaults()},[]),{pageType:o,updatePassengerSelect,childrenAgeDatepickerLimit:e=>{let n=T()(),l=1;t&&t.length>0&&(l=Math.max.apply(Math,[...t]));let a=n.subtract(18,"year").add(l,"day");return e>n||e<a},passengersAutoApply:d,childrenAgeDatepickerPlaceholder:R,popoverInformationText:I,popoverApplyButtonText:M,popoverClearButtonText:N,passengerTitle:F,adultOptions:Z,childrenOptions:B,passengersElementState:n,passengersShowBirthdateCalendar:p,showClearButton:S,showResponsiveClearAndApplyButtons:P}};function QuickSearchOnlyHotelPassengerSelect_styled_templateObject(){let e=(0,o._)(["\n      color: white;\n\n      .passengerSelectBtn {\n        ","\n      }\n    "]);return QuickSearchOnlyHotelPassengerSelect_styled_templateObject=function(){return e},e}function QuickSearchOnlyHotelPassengerSelect_styled_templateObject1(){let e=(0,o._)(["\n  &.alert-active {\n    button {\n      border: 1px solid ",";\n    }\n  }\n\n  ","\n"]);return QuickSearchOnlyHotelPassengerSelect_styled_templateObject1=function(){return e},e}let E=(0,s.ZP)(k.Z).withConfig({componentId:"sc-af95ba58-0"})(QuickSearchOnlyHotelPassengerSelect_styled_templateObject1(),e=>e.theme.antd.colorError,e=>e.theme.isV2&&(0,L.gw)()&&(0,s.iv)(QuickSearchOnlyHotelPassengerSelect_styled_templateObject(),(0,P.t)()));var QuickSearchOnlyHotel_QuickSearchOnlyHotelPassengerSelect_QuickSearchOnlyHotelPassengerSelect=e=>{let{pageType:t,updatePassengerSelect:n,childrenAgeDatepickerLimit:a,passengersAutoApply:r,childrenAgeDatepickerPlaceholder:i,popoverInformationText:c,popoverApplyButtonText:o,popoverClearButtonText:s,passengerTitle:u,adultOptions:h,childrenOptions:d,passengersElementState:p,passengersShowBirthdateCalendar:S,showClearButton:y,showResponsiveClearAndApplyButtons:g}=QuickSearchOnlyHotelPassengerSelect_logic(e);return(0,l.jsxs)(E,{id:"QuickSearchOnlyHotelPassengerSelect","data-testid":"quickSearchOnlyHotelPassengerSelectBlock",children:[(0,C.K)(t)&&(0,l.jsx)("div",{className:"quick-searchBar-title",children:(0,l.jsx)("span",{children:u})}),(0,l.jsx)(q.Z,{onChange:n,childrenAgeDatepickerLimit:a,adultsInfo:p.AdultsInfo,childrenInfo:p.ChildrenInfo,adultOptions:h,childrenOptions:d,autoApply:r,showBirthdateCalendar:S,childrenAgeDatepickerPlaceholder:i,popoverInformationText:c,popoverApplyButtonText:o,popoverClearButtonText:s,showClearButton:y,showResponsiveClearAndApplyButtons:g})]})},W=n(66510),K=n(31955),z=n(55468),J={DeleteRecentSearch:async function(e){let t=(0,z.eI)(),n=(await t.post)("/OnlyHotelProduct/DeleteRecentSearch",e);return(await n).data}},G={InsertRecentSearch:async function(e){let t=(0,z.eI)(),n=(await t.post)("/OnlyHotelProduct/InsertRecentSearch",e);return(await n).data}},U={RecentSearchList:async function(e){let t=(0,z.eI)(),n=(await t.post)("/OnlyHotelProduct/RecentSearchList",e);return(await n).data}},$=n(5621),Y=n(96275),X=n(6298),ee=n(16476),et=n(8465),en=n(81233),QuickSearchOnlyHotelRecentlyViewed_logic=e=>{let t=(0,b.C)(ee.Co),{meta:n,configurations:l}=e,{pageType:r}=n,c=(0,b.T)(),o=(0,w.Z)("PackageTourHotelProduct.PackageSearchProvider",l),s=o.SelectedValues[0]===x.L.packageFlex,u=K.Z.get("Locale"),h=K.Z.get("Currency"),d=[],[p,S]=(0,a.useState)((0,en.BW)($.C.onlyHotel,null)),priceSearchRedirect=e=>{let t=(0,et.K)(e,v.B.onlyHotel,Y.x.QuickSearch);window.location.replace(t)},getRecentSearchList=()=>{U.RecentSearchList({}).then(e=>{void 0!==e.result&&S(e.result.onlyHotelSearchList)}).catch(e=>{(0,i.Z)("QuickSearchOnlyHotelLogic.tsx",e)})},checkCookiesOnLoggedIn=()=>{p&&p.length>0?(p.forEach(e=>{let t={requestDateTime:e.requestDateTime,priceSearchListQuery:{languageCode:u,platformType:0,currencyCode:h,onlyBestPrice:!0,searchCriterias:e.searchCriterias}};d.push(t)}),G.InsertRecentSearch(d).then(e=>{e.result.success&&(0,en.f5)($.C.onlyHotel,[]),getRecentSearchList()})):getRecentSearchList()},controlLoggedIn=e=>{e&&checkCookiesOnLoggedIn()};return(0,a.useEffect)(()=>{controlLoggedIn(t.isLoggedIn)},[t.isLoggedIn]),{pageType:r,onRecentSearchOnlyHotel:e=>{c((0,X.K4)(!0)),c((0,D.cW)(e.searchCriterias)).then(e=>{priceSearchRedirect(e.payload)})},recentlyViewsStateShow:()=>!!p&&p.length>0,removeRecentView:(e,n)=>{e.stopPropagation();let l=p.filter(e=>e.recentSearchId!==n);t.isLoggedIn?J.DeleteRecentSearch({recentSearchIds:[n]}).then(e=>{e.result.success&&((0,en.f5)($.C.onlyHotel,l),S(l))}):((0,en.f5)($.C.onlyHotel,l),S(l))},searchResultLocaleStorage:p,packageFlex:s}};function QuickSearchOnlyHotelRecentlyViewed_styled_templateObject(){let e=(0,o._)([""]);return QuickSearchOnlyHotelRecentlyViewed_styled_templateObject=function(){return e},e}let el=s.ZP.div.withConfig({componentId:"sc-2c8af0ac-0"})(QuickSearchOnlyHotelRecentlyViewed_styled_templateObject());var QuickSearchOnlyHotel_QuickSearchOnlyHotelRecentlyViewed_QuickSearchOnlyHotelRecentlyViewed=e=>{let{pageType:t,onRecentSearchOnlyHotel:n,recentlyViewsStateShow:a,removeRecentView:r,searchResultLocaleStorage:i,packageFlex:c}=QuickSearchOnlyHotelRecentlyViewed_logic(e);return(0,l.jsx)(el,{"data-testid":"quickSearchOnlyHotelRecentlyViewedBlock",children:(0,C.K)(t)&&a()&&(0,l.jsx)(W.Z,{recentlyViewedItemList:i,onClick:n,onRemove:r,packageFlex:c})})},ea=n(46931),er=n(16318),ei=n(53030),ec=n(57234),eo=n(55577),QuickSearchOnlyHotelSearchButton_logic=e=>{let t=(0,b.C)(D.WG),n=(0,b.C)(D.h_),l=(0,b.C)(D.d4),r=(0,en.BW)($.C.onlyHotel,null),c=(0,b.C)(ee.Co),o=(0,b.C)(D._P),{meta:s,configurations:u}=e,{pageType:h}=s,{t:d}=(0,H.$G)(),p=(0,b.T)(),{navigate:S}=(0,ei.Z)(),[y]=(0,a.useState)(!!c.name||!!c.surname),[g,m]=er.default.useNotification(),f=(0,w.Z)("OnlyHotelProduct.HotelListPageSorting",u),k=(0,w.Z)("QuickSearchConfigurations.ShowBirthdateCalendar",u),O=f.SelectedValues[0],C=d("QuickSearch.Search"),Q=d("QuickSearch.RequiredFieldsMessage"),_=d("QuickSearch.ChildAgeValidationMessage"),openNotification=e=>{g.error({message:null!=e?e:Q,placement:"top",className:"quick-search-notification"})},getSearchRequest=()=>{let e=(0,en.BW)("savedFilters",null),a=[T()(t.startDate).format(R.sF),T()(t.endDate).format(R.sF)],r=T()(t.startDate),i=T()(t.endDate),c=i.diff(r,"d");return{beginDates:a,arrivalLocations:n,nights:[{value:c}],roomCriterias:[{passengers:l}],reservationType:v.B.onlyHotel,paging:{pageNumber:1,pageSize:20,sortType:O},additionalFilters:e||[],imageSizes:[0]}},validateRecentSearchData=()=>{let e=getSearchRequest(),t=!0;return r&&r.forEach(n=>{JSON.stringify(n.searchCriterias.arrivalLocations)===JSON.stringify(e.arrivalLocations)&&JSON.stringify(n.searchCriterias.beginDates)===JSON.stringify(e.beginDates)&&JSON.stringify(n.searchCriterias.nights)===JSON.stringify(e.nights)&&JSON.stringify(n.searchCriterias.roomCriterias)===JSON.stringify(e.roomCriterias)&&(t=!1)}),t},validateOnlyHotel=()=>((0,i.Z)("dateSelected"),(0,i.Z)("dateSelected",t),0===n.length&&(0,A.f)("QuickSearchOnlyHotelArrivalLocation","alert-active"),((null==t?void 0:t.startDate)===void 0||(null==t?void 0:t.endDate)===void 0||null===t.startDate||null===t.endDate)&&(0,A.f)("QuickSearchOnlyHotelMultiDatePicker","alert-active"),0===n.length||(null==t?void 0:t.startDate)===void 0||(null==t?void 0:t.endDate)===void 0||null===t.startDate||null===t.endDate)?Q:(null==l?void 0:l.some(e=>e.passengerType===V.B.child&&null!==e.age&&(null==e?void 0:e.age)<1))||k&&(null==l?void 0:l.some(e=>e.passengerType===V.B.child&&null===e.birthDate))?((0,A.f)("QuickSearchOnlyHotelPassengerSelect","alert-active"),_):((0,A.W)("QuickSearchOnlyHotelPassengerSelect","alert-active"),null),handleSearchCookies=()=>{let e=(0,en.BW)($.C.onlyHotel,null);if(null===e)(0,en.f5)($.C.onlyHotel,[{recentSearchId:(0,eo.D)(),requestDateTime:T()().toISOString(),searchCriterias:getSearchRequest()}]);else{let t=[...e];t&&t.length>=3&&t.pop(),t=[{recentSearchId:(0,eo.D)(),requestDateTime:T()().toISOString(),searchCriterias:getSearchRequest()},...t],(0,en.f5)($.C.onlyHotel,t)}},quickSearchLoginControl=()=>{!y&&validateRecentSearchData()&&handleSearchCookies()},setHotelNameFiltersToStorage=()=>{let e=localStorage.getItem("savedHotelNameFilters");e&&localStorage.setItem("hotelNameFilters",e)},priceSearchRedirect=e=>{let t=(0,et.K)(e,v.B.onlyHotel,Y.x.QuickSearch);S(t)},handleDataLayer=()=>{let e=[T()(null==t?void 0:t.startDate).format(R.sF),T()(null==t?void 0:t.endDate).format(R.sF)],a={event:"search_onlyhotel",ecommerce:{items:[{pax:null==l?void 0:l.length,departure:null==n?void 0:n.map(e=>null==e?void 0:e.name),period_hotel:e,item_variant:"onlyhotel"}]}};(0,ec.tu)(a)};return{pageType:h,onSearchOnlyHotel:()=>{let e=validateOnlyHotel();if(e&&e.length>0){openNotification(e);return}p((0,X.K4)(!0)),quickSearchLoginControl(),handleDataLayer(),p((0,D.cW)(getSearchRequest())).then(e=>{(0,en.LV)("savedFilters"),setHotelNameFiltersToStorage(),priceSearchRedirect(e.payload)}).catch(e=>{(0,i.R)("Quick search only hotel error => ",e)})},isSearching:o,search:C,contextHolder:m}},es=n(93323);function QuickSearchOnlyHotelSearchButton_styled_templateObject(){let e=(0,o._)(["\n        border-radius: 50px;\n        min-width: 160px;\n        svg {\n          display: none;\n        }\n        justify-content: center;\n        .btn-child {\n          display: block;\n        }\n        ","\n      "]);return QuickSearchOnlyHotelSearchButton_styled_templateObject=function(){return e},e}function QuickSearchOnlyHotelSearchButton_styled_templateObject1(){let e=(0,o._)(["\n  button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    ","\n\n    svg {\n      g {\n        clip-path: none;\n      }\n    }\n  }\n"]);return QuickSearchOnlyHotelSearchButton_styled_templateObject1=function(){return e},e}let eu=(0,s.ZP)(k.Z).withConfig({componentId:"sc-e8dd45c4-0"})(QuickSearchOnlyHotelSearchButton_styled_templateObject1(),e=>e.theme.isV2&&(0,s.iv)(QuickSearchOnlyHotelSearchButton_styled_templateObject(),(0,es.Z)()));var QuickSearchOnlyHotel_QuickSearchOnlyHotelSearchButton_QuickSearchOnlyHotelSearchButton=e=>{let{pageType:t,onSearchOnlyHotel:n,isSearching:a,search:r,contextHolder:i}=QuickSearchOnlyHotelSearchButton_logic(e);return(0,l.jsxs)(eu,{"data-testid":"quickSearchOnlyHotelSearchButtonBlock",children:[i,(0,C.K)(t)&&(0,l.jsx)("div",{className:"quick-searchBar-title",children:(0,l.jsx)("span",{children:"\xa0"})}),(0,l.jsxs)(h.Z,{dataTestid:"quickSearchOnlyHotelSearchButtonBlock",name:"searchButton",title:"Search",type:"primary",size:"large",onClick:n,loading:a,children:[(0,l.jsx)(O.Z,{icon:ea.i}),r]})]})},QuickSearchOnlyHotel_QuickSearchOnlyHotel=e=>{(0,i.Z)("QuickSearchOnlyHotel");let{isMobile:t}=(0,c.Z)();return(0,l.jsxs)(d,{children:[(0,l.jsxs)(p,{verticalSpacing:16,horizontalSpacing:{xs:16,xl:16,lg:16},children:[(0,l.jsx)(r.Z,{dataTestid:"quickSearchOnlyHotelArrivalLocationColumn",columnOffset:0,columnSpan:t?24:11,children:(0,l.jsx)(QuickSearchOnlyHotel_QuickSearchOnlyHotelArrivalLocation_QuickSearchOnlyHotelArrivalLocation,{...e})}),(0,l.jsx)(S,{dataTestid:"quickSearchOnlyHotelMultiDatePickerColumn",columnOffset:0,flex:1,columnSpan:t?24:8,children:(0,l.jsx)(QuickSearchOnlyHotel_QuickSearchOnlyHotelMultiDatePicker_QuickSearchOnlyHotelMultiDatePicker,{...e})}),(0,l.jsx)(r.Z,{dataTestid:"quickSearchOnlyHotelPassengerSelectColumn",columnOffset:0,flex:0,columnSpan:t?24:3,children:(0,l.jsx)(QuickSearchOnlyHotel_QuickSearchOnlyHotelPassengerSelect_QuickSearchOnlyHotelPassengerSelect,{...e})}),(0,l.jsx)(r.Z,{dataTestid:"quickSearchOnlyHotelSearchButtonColumn",columnOffset:0,flex:0,columnSpan:t?24:void 0,children:(0,l.jsx)(QuickSearchOnlyHotel_QuickSearchOnlyHotelSearchButton_QuickSearchOnlyHotelSearchButton,{...e})})]}),(0,l.jsx)(QuickSearchOnlyHotel_QuickSearchOnlyHotelRecentlyViewed_QuickSearchOnlyHotelRecentlyViewed,{...e})]})}}}]);