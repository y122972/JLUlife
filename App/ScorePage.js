import React, { Component } from "react";
import {
    View,
    Dimensions,
    ActivityIndicator,
    ToastAndroid
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import ScoreView from "../src/ScoreView";
import AppStorage from "../src/AppStorage";
import ScoreInterface from "../src/ScoreInterface";

const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getScore: false,
            statCount: 0,
            scoreList: []
        };
    }
    componentDidMount() {
        AppStorage._load("scoreJson", res => {
            this.setState({
                scoreList: res
            });
            this.setState({
                getScore: true
            });
        });
        if (!this.state.getScore) {
            if (Global.isOnline)
                ScoreInterface(res => {
                    if (res != "error") {
                        this.setState({
                            scoreList: res,
                            getScore: true
                        });
                    }
                });
            else ToastAndroid.show("登录后才能刷新成绩哟~", ToastAndroid.LONG);
        }
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={<EIcon name="menu" size={28} color="white" />}
                            clear
                            onPress={this.openDrawer}
                        />
                    }
                    centerComponent={{
                        text: "成绩查询",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                {this.state.getScore ? (
                    <ScoreView scoreList={this.state.scoreList} />
                ) : (
                    <View
                        style={{
                            paddingVertical: height / 2 - 150,
                            backgroundColor: "#eee"
                        }}
                    >
                        <ActivityIndicator
                            style={{}}
                            size="large"
                            color="#2089dc"
                        />
                    </View>
                )}
            </View>
        );
    }
}