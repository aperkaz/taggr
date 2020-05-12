import Search from "./Search";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ task: state.task });

export default connect(mapStateToProps)(Search);
