import { connect } from "react-redux";
import DashboardPage from "./DashboardPage";

// redux bindings
const mapStateToProps = (state) => ({ images: state.images });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
