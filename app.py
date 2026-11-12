import streamlit as st
import pandas as pd
import plotly.express as px

# Page configuration
st.set_page_config(
    page_title="SalesPulse",
    page_icon="📊",
    layout="wide"
)

# Application header
st.title("📊 SalesPulse")
st.subheader("Retail Sales Analytics Platform")

st.markdown("---")

# Sidebar
st.sidebar.title("SalesPulse")
st.sidebar.caption("Retail Intelligence")

page = st.sidebar.radio(
    "Navigation",
    ["Dashboard", "Sales Analysis", "Product Analysis"]
)

# Dataset upload
uploaded_file = st.sidebar.file_uploader(
    "Upload Retail Dataset",
    type=["csv", "xlsx"]
)

if uploaded_file:

    if uploaded_file.name.endswith(".csv"):
        df = pd.read_csv(uploaded_file)
    else:
        df = pd.read_excel(uploaded_file)

    st.success("Dataset uploaded successfully!")

    st.subheader("Dataset Overview")
    st.dataframe(df.head(10), use_container_width=True)

    if page == "Dashboard":

        if {"quantity", "unit_price"}.issubset(df.columns):

            df["revenue"] = df["quantity"] * df["unit_price"]

            col1, col2, col3 = st.columns(3)

            col1.metric(
                "Total Revenue",
                f"₹{df['revenue'].sum():,.2f}"
            )

            col2.metric(
                "Total Orders",
                len(df)
            )

            col3.metric(
                "Units Sold",
                int(df["quantity"].sum())
            )

            st.subheader("Revenue Distribution")

            fig = px.histogram(
                df,
                x="revenue",
                title="Sales Revenue"
            )

            st.plotly_chart(fig, use_container_width=True)

        else:
            st.warning(
                "Required columns: quantity and unit_price"
            )

    elif page == "Sales Analysis":
        st.subheader("Sales Analysis")
        st.write(df.describe())

    elif page == "Product Analysis":
        st.subheader("Product Analysis")

        if {"product", "quantity"}.issubset(df.columns):

            product_sales = (
                df.groupby("product")["quantity"]
                .sum()
                .reset_index()
            )

            fig = px.bar(
                product_sales,
                x="product",
                y="quantity",
                title="Products Sold"
            )

            st.plotly_chart(fig, use_container_width=True)

        else:
            st.warning("Dataset needs product and quantity columns.")

else:
    st.info("Upload your retail sales dataset to get started.")

    st.markdown("""
    ### Welcome to SalesPulse!

    Your retail analytics platform.

    - Sales Performance
    - Revenue Analysis
    - Product Performance
    - Business Intelligence
    """)