import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";

const IntakeProgress = () => {

  const IntakeWater = useSelector((state) => state.counter.value);

  const progress = 0;
  const radius = 100;
  const strokeWidth = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {/* Header section for labels */}
        <View style={styles.intakeprogress}>
          <Text style={styles.progressText}>
            <FontAwesome6 name="bars-progress" size={24} color="#3498db" />{" "}
            {" "}
            Intake Progress
          </Text>

          <Text style={styles.targetText}>
            <Feather name="target" size={24} color="#3498db" />
            {" "}
            Target: {IntakeWater} ml
          </Text>
        </View>

        <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
          <Circle
            stroke="white"
            fill="transparent"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="lightblue"
            fill="transparent"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            originX={radius + strokeWidth / 2}
            originY={radius + strokeWidth / 2}
          />
        </Svg>

        <View style={styles.textContainer}>
          <Text style={styles.label}>{`${Math.round(progress * 100)}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // marginBottom: 50,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  label: {
    fontSize: 40,
    marginTop: 55,
    color: "#3498db",
    fontWeight: "900",
  },
  intakeprogress: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex:  1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  },
  targetText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default IntakeProgress;
