"use client"

import { useState, useEffect } from "react"
import { Coffee, Heart, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getPaidUsers, initiatePayment } from "@/actions/userActions"
import Script from "next/script"

const BuyCoffee = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: "",
        currency: "INR",
        message: "",
    })
    const [supporters, setSupporters] = useState([])

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        const orderData = await initiatePayment(formData)
        const options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "amount": orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": orderData.currency,
            "name": "Coffee for Monsur",
            "description": "Support my work with a coffee!",
            "image": `${process.env.NEXT_PUBLIC_BASE_URL}/images/pfp_my_image.jpg`,
            "order_id": orderData.id,
            "callback_url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-payment`,
            "prefill": {
                "name": formData.name,
                "email": formData.email,
                "contact": formData.phone
            },
            "notes": {
                "address": "Silchar Assam",
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.description);
            
        });
        rzp1.open();
        // Reset form after submission
        setFormData({
            name: "",
            email: "",
            phone: "",
            amount: "",
            currency: "INR",
            message: "",
        })
        console.log("Payment initiated:", orderData)
    }

    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const data = await getPaidUsers()
                setSupporters(data)
            } catch (err) {
                console.error("Failed to load supporters:", err)
            }
        }

        fetchSupporters()
    }, [])

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    const getCurrencySymbol = (currency) => {
        const symbols = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
            PKR: "₨",
            JPY: "¥",
            CAD: "C$",
            AUD: "A$",
        }
        return symbols[currency] || currency
    }

    return (
        <div className="min-h-screen ">
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Supporters */}
                    <div className="space-y-6">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support My Work</h1>
                            <p className="text-lg text-gray-600 mb-4">
                                Your support helps me create more amazing content and projects!
                            </p>
                            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{supporters.length} supporters</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>Thank you!</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Supporters */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Coffee className="h-5 w-5 text-orange-600" />
                                    <span>Recent Supporters</span>
                                </CardTitle>
                                <CardDescription>Amazing people who have supported my work</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {supporters.map((supporter) => (
                                    <div
                                        key={supporter._id}
                                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-orange-100 text-orange-700">
                                                {getInitials(supporter.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 truncate">{supporter.name}</p>
                                                <div className="flex items-center space-x-1 text-sm font-semibold text-green-600">
                                                    <span>{getCurrencySymbol(supporter.currency)}</span>
                                                    <span>{String(parseInt(supporter.amount / 100))}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{supporter.email}</p>
                                            {supporter.message && <p className="text-sm text-gray-700 mt-1 italic">"{supporter.message}"</p>}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Payment Form */}
                    <div className="lg:sticky lg:top-8">
                        <Card className="shadow-lg">
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                                    <Coffee className="h-6 w-6 text-orange-600" />
                                    <span>Buy Me A Coffee</span>
                                </CardTitle>
                                <CardDescription>Support my work with a coffee! Every contribution helps.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone (Optional)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Amount *</Label>
                                            <Input
                                                id="amount"
                                                type="number"
                                                placeholder="25"
                                                min="1"
                                                step="0.01"
                                                value={formData.amount}
                                                onChange={(e) => handleInputChange("amount", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="currency">Currency</Label>
                                            <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                    <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                                                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Leave a nice message..."
                                            rows={3}
                                            value={formData.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                        />
                                    </div>

                                    {/* Amount Preview */}
                                    {formData.amount && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">You're contributing:</span>
                                                <span className="text-lg font-bold text-orange-600">
                                                    {getCurrencySymbol(formData.currency)}
                                                    {formData.amount}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
                                        disabled={!formData.name || !formData.email || !formData.amount}
                                    >
                                        Support with {getCurrencySymbol(formData.currency)}
                                        {formData.amount || "0"}
                                    </Button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Your payment is secure and processed safely. Thank you for your support! ❤️
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyCoffee
