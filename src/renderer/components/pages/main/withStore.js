import { connect } from "react-redux";
import MainPage from "./Page";

// redux bindings
const mapStateToProps = (state) => ({ images: state.images });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
