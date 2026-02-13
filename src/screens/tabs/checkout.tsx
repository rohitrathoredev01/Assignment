import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../hooks/hooks";

const steps = ["Shipping", "Payment", "Completed"];

export default function Checkout() {
    const checkoutItems = useAppSelector(state => state.product?.checkoutItems);
    console.log(checkoutItems);

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Check out</Text>

            {/* Stepper */}
            <View style={styles.stepperContainer}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepWrapper}>
                        <View
                            style={[
                                styles.stepCircle,
                                currentStep >= index && styles.activeStep,
                            ]}
                        />
                        {index !== steps.length - 1 && (
                            <View
                                style={[
                                    styles.stepLine,
                                    currentStep > index && styles.activeLine,
                                ]}
                            />
                        )}
                    </View>
                ))}
            </View>

            {/* Step Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {currentStep === 0 && <ShippingStep nextStep={nextStep} />}
                {currentStep === 1 && (
                    <PaymentStep nextStep={nextStep} prevStep={prevStep} />
                )}
                {currentStep === 2 && <CompletedStep />}
            </ScrollView>
        </SafeAreaView>
    );
}

/* ===================== SHIPPING ===================== */

const ShippingStep = ({ nextStep }: any) => {

    return (
        <View style={styles.content}>
            <Text style={styles.stepTitle}>Shipping</Text>

            <TextInput placeholder="First Name" placeholderTextColor="#777" style={styles.input} />
            <TextInput placeholder="Last Name" placeholderTextColor="#777" style={styles.input} />
            <TextInput placeholder="Country" placeholderTextColor="#777" style={styles.input} />
            <TextInput placeholder="Street Name" placeholderTextColor="#777" style={styles.input} />
            <TextInput placeholder="City" placeholderTextColor="#777" style={styles.input} />
            <TextInput placeholder="Phone Number" placeholderTextColor="#777" style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>Continue to payment</Text>
            </TouchableOpacity>
        </View>
    );
};

/* ===================== PAYMENT ===================== */

const PaymentStep = ({ nextStep, prevStep }: any) => {
    const checkoutItems = useAppSelector(state => state.product?.checkoutItems || []);

    return (
        <View style={styles.content}>
            <Text style={styles.stepTitle}>Payment</Text>

            <View style={styles.paymentMethods}>
                <TouchableOpacity style={styles.paymentBox}>
                    <Text style={styles.paymentText}>Cash</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.paymentBox,]}>
                    <Text style={styles.paymentText}>Credit Card</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Product price: ${checkoutItems?.price}</Text>
                <Text style={styles.summaryText}>Shipping: Free</Text>
                <Text style={styles.summaryTotal}>Total: {checkoutItems?.price * checkoutItems?.quantity} </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>Place my order</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={prevStep}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

/* ===================== COMPLETED ===================== */

const CompletedStep = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.contentCenter}>
            <Text style={styles.completedIcon}>🛍️</Text>
            <Text style={styles.stepTitle}>Order Completed</Text>
            <Text style={styles.subText}>
                Thank you for your purchase.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('HomeTab')}>
                <Text style={styles.buttonText}>Continue shopping</Text>
            </TouchableOpacity>
        </View>
    );
};

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F1115",
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "600",
        marginVertical: 20,
    },

    /* Stepper */
    stepperContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,

    },
    stepWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    stepCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#333",
    },
    activeStep: {
        backgroundColor: "#4CAF50",
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: "#333",
    },
    activeLine: {
        backgroundColor: "#4CAF50",
    },

    /* Content */
    content: {
        flex: 1,
    },
    contentCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    stepTitle: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "600",
        marginBottom: 20,
    },
    subText: {
        color: "#aaa",
        marginVertical: 10,
    },

    input: {
        padding: 15,
        borderRadius: 10,
        color: "#fff",
        marginBottom: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },

    /* Payment */
    paymentMethods: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    paymentBox: {
        flex: 1,
        backgroundColor: "#1A1D24",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        marginRight: 10,
    },
    selectedPayment: {
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    paymentText: {
        color: "#fff",
    },

    summary: {
        backgroundColor: "#1A1D24",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    summaryText: {
        color: "#aaa",
        marginBottom: 5,
    },
    summaryTotal: {
        color: "#fff",
        fontWeight: "600",
        marginTop: 10,
    },

    button: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        fontWeight: "600",
    },

    backText: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 15,
    },

    completedIcon: {
        fontSize: 60,
    },
});


