'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User,
  FileText,
  CreditCard,
  AlertCircle,
  Bell,
  TrendingUp,
  CheckCircle,
  Clock,
  Droplet,
  Home,
  Store,
  MessageSquare,
  Calendar,
  Download,
  Eye,
  ArrowRight,
  DollarSign,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function CitizenDashboardPage() {
  const [userData] = useState({
    name: 'राजेश कुमार शर्मा',
    email: 'rajesh.sharma@email.com',
    phone: '+91-9876543210',
    address: 'घर क्र. 234, शिवाजी नगर, प्रभाग क्र. 25',
    memberSince: 'जानेवारी 2024',
    ward: 'प्रभाग क्र. 25'
  });

  const quickStats = [
    { 
      label: 'एकूण बिले',
      value: '₹24,420',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
      trend: '+2.5%',
      description: 'थकीत रक्कम'
    },
    { 
      label: 'सक्रिय तक्रारी',
      value: '2',
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-600',
      trend: '-1',
      description: 'प्रक्रियेत'
    },
    { 
      label: 'अर्ज',
      value: '5',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      trend: '+3',
      description: 'एकूण सबमिट'
    },
    { 
      label: 'सूचना',
      value: '12',
      icon: Bell,
      color: 'bg-purple-100 text-purple-600',
      trend: 'नवीन',
      description: 'न वाचलेल्या'
    },
  ];

  const pendingBills = [
    {
      id: 1,
      type: 'मालमत्ता कर',
      amount: '₹8,500',
      dueDate: '30 जून 2026',
      status: 'pending',
      icon: Home,
      color: 'text-red-600',
      link: '/citizen/property-tax'
    },
    {
      id: 2,
      type: 'पाणी बिल',
      amount: '₹420',
      dueDate: '25 जून 2026',
      status: 'pending',
      icon: Droplet,
      color: 'text-blue-600',
      link: '/citizen/water-bills'
    },
  ];

  const recentApplications = [
    {
      id: 1,
      type: 'जन्म प्रमाणपत्र',
      applicationNo: 'BIRTH/2026/123456',
      date: '15 जून 2026',
      status: 'in_progress',
      statusLabel: 'प्रक्रियेत',
      statusColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 2,
      type: 'व्यापार परवाना',
      applicationNo: 'TL/2026/789012',
      date: '10 जून 2026',
      status: 'approved',
      statusLabel: 'मंजूर',
      statusColor: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'विवाह प्रमाणपत्र',
      applicationNo: 'MARRIAGE/2026/345678',
      date: '05 जून 2026',
      status: 'under_review',
      statusLabel: 'तपासणी',
      statusColor: 'bg-blue-100 text-blue-600'
    },
  ];

  const activeComplaints = [
    {
      id: 1,
      complaintNo: 'CMP/2026/45678',
      category: 'रस्ते',
      title: 'मुख्य रस्त्यावर मोठा खड्डा',
      date: '15 जून 2026',
      status: 'in_progress',
      statusLabel: 'कार्यरत',
      priority: 'उच्च'
    },
    {
      id: 2,
      complaintNo: 'CMP/2026/45679',
      category: 'स्ट्रीट लाइट',
      title: 'रस्त्यावरील दिवे बंद',
      date: '20 जून 2026',
      status: 'assigned',
      statusLabel: 'विभागाकडे पाठवली',
      priority: 'मध्यम'
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'मालमत्ता कर बिल तयार',
      message: 'तुमचे 2025-26 चे मालमत्ता कर बिल तयार आहे',
      time: '2 तास आधी',
      type: 'bill',
      unread: true
    },
    {
      id: 2,
      title: 'तक्रार अपडेट',
      message: 'CMP/2026/45678 - काम सुरू झाले आहे',
      time: '5 तास आधी',
      type: 'complaint',
      unread: true
    },
    {
      id: 3,
      title: 'अर्ज मंजूर',
      message: 'तुमचा व्यापार परवाना अर्ज मंजूर झाला',
      time: '1 दिवस आधी',
      type: 'application',
      unread: false
    },
  ];

  const quickActions = [
    { label: 'नवीन तक्रार', icon: MessageSquare, href: '/citizen/complaints/new', color: 'bg-red-500' },
    { label: 'बिल भरा', icon: CreditCard, href: '/citizen/payments', color: 'bg-green-500' },
    { label: 'प्रमाणपत्र', icon: FileText, href: '/citizen/certificates', color: 'bg-blue-500' },
    { label: 'परवाना', icon: Store, href: '/citizen/licenses', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                नमस्कार, {userData.name.split(' ')[0]} 👋
              </h1>
              <p className="text-gray-600">तुमच्या खात्याचे विहंगावलोकन आणि अलीकडील क्रियाकलाप</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                रिपोर्ट डाउनलोड
              </Button>
              <Link href="/citizen/notifications">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 relative">
                  <Bell size={16} className="mr-2" />
                  सूचना
                  {recentNotifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {recentNotifications.filter(n => n.unread).length}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardBody>
            <h2 className="text-xl font-bold mb-4">जलद क्रिया</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} href={action.href}>
                    <div className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl p-4 text-center cursor-pointer transition">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="font-semibold text-sm">{action.label}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Bills */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard size={20} />
                    थकीत बिले
                  </h2>
                  <Link href="/citizen/payments">
                    <Button variant="ghost" size="sm">
                      सर्व पहा
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                {pendingBills.length > 0 ? (
                  <div className="space-y-4">
                    {pendingBills.map((bill) => {
                      const Icon = bill.icon;
                      return (
                        <div key={bill.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                              <Icon size={24} className={bill.color} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{bill.type}</p>
                              <p className="text-sm text-gray-600">देय तारीख: {bill.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-red-600">{bill.amount}</p>
                            <Link href={bill.link}>
                              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                                भरा
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-semibold text-gray-900">एकूण थकीत:</span>
                      <span className="text-2xl font-bold text-red-600">₹8,920</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto text-green-600 mb-3" size={48} />
                    <p className="text-gray-600">सर्व बिले भरलेली आहेत! 🎉</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText size={20} />
                    अलीकडील अर्ज
                  </h2>
                  <Link href="/citizen/applications">
                    <Button variant="ghost" size="sm">
                      सर्व पहा
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">{app.type}</p>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${app.statusColor}`}>
                            {app.statusLabel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">अर्ज क्र: {app.applicationNo}</p>
                        <p className="text-xs text-gray-500">{app.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Active Complaints */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare size={20} />
                    सक्रिय तक्रारी
                  </h2>
                  <Link href="/citizen/complaints">
                    <Button variant="ghost" size="sm">
                      सर्व पहा
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {activeComplaints.map((complaint) => (
                    <div key={complaint.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">📋</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              {complaint.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              complaint.priority === 'उच्च' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {complaint.priority}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900 mb-1">{complaint.title}</p>
                          <p className="text-sm text-gray-600 mb-2">तक्रार क्र: {complaint.complaintNo}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {complaint.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity size={12} />
                              {complaint.statusLabel}
                            </span>
                          </div>
                        </div>
                        <Link href="/citizen/complaints/track">
                          <Button variant="ghost" size="sm">
                            <Eye size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User size={20} />
                  माझे प्रोफाइल
                </h2>
              </CardHeader>
              <CardBody>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                    {userData.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900">{userData.name}</h3>
                  <p className="text-sm text-gray-600">{userData.ward}</p>
                </div>
                <div className="space-y-3 text-sm border-t pt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📧</span>
                    <span className="break-all">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📞</span>
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <span>📍</span>
                    <span>{userData.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span>
                    <span>सदस्य: {userData.memberSince}</span>
                  </div>
                </div>
                <Link href="/citizen/profile">
                  <Button variant="outline" className="w-full mt-4">
                    प्रोफाइल संपादित करा
                  </Button>
                </Link>
              </CardBody>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Bell size={20} />
                    अलीकडील सूचना
                  </h2>
                  <Link href="/citizen/notifications">
                    <Button variant="ghost" size="sm">
                      सर्व पहा
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.unread
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 mb-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            <Clock size={10} className="inline mr-1" />
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Payment History Summary */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardBody>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">या महिन्याचा खर्च</p>
                    <p className="text-2xl font-bold text-gray-900">₹12,500</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">मालमत्ता कर:</span>
                    <span className="font-semibold">₹8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">पाणी बिल:</span>
                    <span className="font-semibold">₹420</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">इतर:</span>
                    <span className="font-semibold">₹3,580</span>
                  </div>
                </div>
                <Link href="/citizen/payments">
                  <Button variant="outline" className="w-full mt-4">
                    पूर्ण इतिहास पहा
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
