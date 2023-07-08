import axios from "axios";
import {
  pdf,
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const generateInvoicePdf = async (order, user, num) => {
  const styles = StyleSheet.create({
    doc: {
      marginLeft: 30,
      marginVertical: 20,
    },
    header: {
      marginRight: 60,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "4px solid indigo",
    },
    image: {
      width: 50,
      height: 50,
    },
    text: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      fontSize: "7px",
      marginTop: 2,
    },
    table: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: 10,
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      marginRight: 60,
      marginBottom: 10,
      fontSize: "8px",
      gap: 2,
    },
    tableContent: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: 10,
      fontSize: "7px",
      color: "#393646",
      gap: 2,
    },
    total: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: 10,
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      marginRight: 60,
      marginBottom: 10,
      fontSize: "8px",
    },
  });

  const currentDate = new Date();

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // Create a new PDF document
  const invoiceDoc = (
    <Document>
      <Page size="A4" style={styles.doc}>
        <View style={styles.header}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <View>
              <Image
                src="https://res.cloudinary.com/dgjsucqux/image/upload/v1688292188/artistry/assets/logo_aeixdl.png"
                style={styles.image}
              />
            </View>
            <View>
              <Image
                src="https://res.cloudinary.com/dgjsucqux/image/upload/v1688366857/artistry/assets/My_project_1_vcsdnt.png"
                style={{ height: 30 }}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "7px",
                fontSize: "8px",
              }}
            >
              <Text style={{ fontWeight: "semibold" }}>Invoice Number:</Text>
              <Text>{"INV-" + num}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "7px",
                fontSize: "8px",
              }}
            >
              <Text style={{ fontWeight: "semibold" }}>Issues On:</Text>
              <Text>{formattedDate}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid grey",
            paddingVertical: 10,
            marginRight: 60,
          }}
        >
          <View>
            <Text
              style={{
                color: "#4E6E81",
                fontSize: "8px",
                marginBottom: "5px",
              }}
            >
              PAYMENT DETAILS
            </Text>
            <View style={styles.text}>
              <Text>Payment Method:</Text>
              <Text style={{ color: "#191825" }}> Cash On Delivery</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            borderBottom: "1px solid grey",
            marginRight: 60,
          }}
        >
          <View>
            <Text
              style={{
                color: "#4E6E81",
                fontSize: "8px",
                marginBottom: "5px",
              }}
            >
              BILL TO
            </Text>
            <View style={styles.text}>
              <Text>Full Name:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.fullName}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Phone Number:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.phoneNumber}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Email:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.email}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Street Address:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.streetAddress}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>City:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.city}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>State:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.state}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Pincode:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.pincode}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Country:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.billing.country}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "#4E6E81",
                fontSize: "8px",
                marginBottom: "5px",
              }}
            >
              SHIP TO
            </Text>
            <View style={styles.text}>
              <Text>Full Name:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.fullName}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Phone Number:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.phoneNumber}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Email:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.email}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Street Address:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.streetAddress}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>City:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.city}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>State:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.state}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Pincode:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.pincode}
              </Text>
            </View>
            <View style={styles.text}>
              <Text>Country:</Text>
              <Text style={{ color: "#191825" }}>
                {" "}
                {order.shippingInfo.shipping.country}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 60 }}>
          <Text style={{ color: "#4E6E81", fontSize: "8px" }}>
            ORDER DETAILS
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "7px",
              fontSize: "7px",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "semibold" }}>Order ID:</Text>
            <Text>{"ORD-" + num}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "7px",
              fontSize: "7px",
            }}
          >
            <Text style={{ fontWeight: "semibold" }}>Ordered On:</Text>
            <Text>04 July, 2023</Text>
          </View>
        </View>

        {/* {order.order.items.map((item) => (
          <View key={item.product._id} style={styles.tableContent}>
            <Text style={{ width: "20%" }}>Artwork</Text>
            <View style={{ width: "30%" }}>
              <Text>
                {item.product.title}, Medium: {item.product.medium}, Category:{" "}
                {item.product.category}, Size: {item.product.size}
              </Text>
              <Text>ProductID: ART{item.product._id.toUpperCase()}</Text>
              <Text style={{ marginTop: 10 }}>
                Shipping and Handling Charges
              </Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text>{item.quantity}</Text>
              <Text style={{ marginTop: 10 }}>{item.quantity}</Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text>{(item.quantity * item.product.price).toFixed(2)}</Text>
              <Text style={{ marginTop: 10 }}>
                {(item.quantity * 100).toFixed(2)}
              </Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text>
                {(
                  order.order.discount.coupon.discount *
                  0.01 *
                  item.quantity *
                  item.product.price
                ).toFixed(2)}
              </Text>
              <Text style={{ marginTop: 10 }}>0.00</Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text>0.00</Text>
              <Text style={{ marginTop: 10 }}>0.00</Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text>
                {(
                  item.quantity *
                  (item.product.price -
                    order.order.discount.coupon.discount *
                      0.01 *
                      item.product.price)
                ).toFixed(2)}
              </Text>
              <Text style={{ marginTop: 10 }}>
                {(item.quantity * 100).toFixed(2)}
              </Text>
            </View>
          </View>
        ))} */}

        <View style={styles.table}>
          <Text style={{ width: "10%" }}>Product</Text>
          <View style={{ wisth: "90%", display: "flex", flexDirection: "row" }}>
            <Text style={{ width: "37.5%", paddingLeft: 5 }}>Title</Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>Qty</Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              Gross Amount (Rs.)
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              Discount (Rs.)
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              Tax (Rs.)
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              Total (Rs.)
            </Text>
          </View>
        </View>

        {order.order.items.map((item) => (
          <View key={item.product._id} style={styles.tableContent}>
            <Text style={{ width: "10%" }}>Artwork</Text>
            <View
              style={{
                wisth: "90%",
                display: "flex",
                flexDirection: "column",
                marginRight: 60,
              }}
            >
              <View
                style={{ wisth: "100%", display: "flex", flexDirection: "row" }}
              >
                <View style={{ width: "37.5%" }}>
                  <Text>
                    {item.product.title}, Medium: {item.product.medium},
                    Category: {item.product.category}, Size: {item.product.size}
                  </Text>
                  <Text>ProductID: ART{item.product._id.toUpperCase()}</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text>{(item.quantity * item.product.price).toFixed(2)}</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text>
                    {(
                      order.order.discount.coupon.discount *
                      0.01 *
                      item.quantity *
                      item.product.price
                    ).toFixed(2)}
                  </Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text>0.00</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text>
                    {(
                      item.quantity *
                      (item.product.price -
                        order.order.discount.coupon.discount *
                          0.01 *
                          item.product.price)
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>

              <View
                style={{ wisth: "100%", display: "flex", flexDirection: "row" }}
              >
                <View style={{ width: "37.5%" }}>
                  <Text style={{ marginTop: 10 }}>
                    Shipping and Handling Charges
                  </Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text style={{ marginTop: 10 }}>{item.quantity}</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text style={{ marginTop: 10 }}>
                    {(item.quantity * 100).toFixed(2)}
                  </Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text style={{ marginTop: 10 }}>0.00</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text style={{ marginTop: 10 }}>0.00</Text>
                </View>
                <View style={{ width: "12.5%", textAlign: "center" }}>
                  <Text style={{ marginTop: 10 }}>
                    {(item.quantity * 100).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.total}>
          <Text style={{ width: "10%" }}></Text>
          <View
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ width: "37.5%", marginRight: "7px" }}>Total</Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              {order.order.totalQuantity}
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              {(order.order.subtotal + order.order.delivery).toFixed(2)}
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              {order.order.discount.amount.toFixed(2)}
            </Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>0.00</Text>
            <Text style={{ width: "12.5%", textAlign: "center" }}>
              {order.order.totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "90%",
            right: 60,
            paddingTop: 3,
            borderTop: "1px solid black",
          }}
        >
          <Text style={{ fontSize: "6px", textAlign: "center" }}>
            This is a computer generated invoice. No signature required.
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Generate a Blob from the PDF document
  const blob = await pdf(invoiceDoc).toBlob();

  // Generate a unique filename for the PDF
  const filename = `${user.displayName + "_" + formattedDate}.pdf`;

  // Upload the PDF to Cloudinary
  const formData = new FormData();
  formData.append("file", blob, filename);
  formData.append("upload_preset", "invoices");

  // const cloudinary = new Cloudinary({
  //   cloud: {
  //     cloudName: import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME,
  //     apiKey: import.meta.env
  //       .VITE_REACT_APP_RECAPTCHA_CASH_ON_DELIVERY_SITE_KEY,
  //     apiSecret: import.meta.env
  //       .VITE_REACT_APP_RECAPTCHA_CASH_ON_DELIVERY_SECRET_KEY,
  //   },
  // });

  // // const uploadResponse = await cloudinary.upload(formData);

  // // Return the URL of the uploaded PDF
  // // return uploadResponse.secure_url;
  // console.log(blob);
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
    }/raw/upload`,
    formData
  );

  return response.data.secure_url;
};

export const generateInvoiceNumber = () => {
  const currentDate = new Date();
  const uniqueId = Math.floor(Math.random() * 1000000);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const invoiceNumber = `${year}${month}${day}-${hours}${minutes}${seconds}-${uniqueId}`;

  return invoiceNumber;
};

export default generateInvoicePdf;
