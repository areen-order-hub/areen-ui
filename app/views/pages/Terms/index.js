import React, { useEffect, useRef } from "react";
// nodejs library that concatenates classes

// reactstrap components
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import clsx from "classnames";
import "./termsStyles.scss";

const Terms = () => {
  const ref = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    ref.current.scrollTop = 0;
    document.body.classList.add("bg-default");

    return () => {
      document.body.classList.remove("bg-default");
    };
  });

  return (
    <>
      <div className="mb-6" ref={ref}>
        <Container className="mt-3 ">
          <Row className="justify-content-center">
            <Col>
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className={clsx("documentTitle", "mt-3")}>
                    Terms and Conditions ("Terms") of Areen Order Hub Hiring
                    Solutions Pvt. Ltd.
                  </div>
                  <div className={clsx("bodyText")}>
                    Last updated: November 15, 2018
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Please read these Terms and Conditions ("Terms", "Terms and
                    Conditions") carefully before using the http://www.theAreen
                    Order Hub.in website (the "Service") operated by Areen Order
                    Hub Hiring Solutions Pvt. Ltd ("us", "we", or "our").
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Your access to and use of the Service is conditioned upon
                    your acceptance of and compliance with these Terms. These
                    Terms apply to all visitors, users and others who wish to
                    access or use the Service.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    By accessing or using the Service you agree to be bound by
                    these Terms. If you disagree with any part of the terms then
                    you do not have permission to access the Service.
                  </div>
                  <div className={clsx("sectionTitle", "mt-3")}>
                    Communications
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    By creating an Account on our service, you agree to
                    subscribe to newsletters, marketing or promotional materials
                    and other information we may send. However, you may opt out
                    of receiving any, or all, of these communications from us by
                    following the unsubscribe link or instructions provided in
                    any email we send.
                  </div>
                  <div className={clsx("sectionTitle", "mt-3")}>
                    Subscriptions
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Some parts of the Service are billed on a subscription basis
                    ("Subscription(s)"). You will be billed in advance on a
                    recurring and periodic basis ("Billing Cycle"). Billing
                    cycles are set on a monthly basis.
                  </div>

                  <div className={clsx("bodyText", "mt-3")}>
                    At the end of each Billing Cycle, your Subscription will
                    automatically renew under the exact same conditions unless
                    you cancel it or Areen Order Hub Hiring Solutions Pvt. Ltd
                    cancels it. You may cancel your Subscription renewal either
                    through your online account management page or by contacting
                    Areen Order Hub Hiring Solutions Pvt. Ltd customer support
                    team.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    A valid payment method, including credit card, is required
                    to process the payment for your Subscription. You shall
                    provide Areen Order Hub Hiring Solutions Pvt. Ltd with
                    accurate and complete billing information including full
                    name, address, state, zip code, telephone number, and a
                    valid payment method information. By submitting such payment
                    information, you automatically authorize Areen Order Hub
                    Hiring Solutions Pvt. Ltd to charge all Subscription fees
                    incurred through your account to any such payment
                    instruments.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Should automatic billing fail to occur for any reason, Areen
                    Order Hub Hiring Solutions Pvt. Ltd will issue an electronic
                    invoice indicating that you must proceed manually, within a
                    certain deadline date, with the full payment corresponding
                    to the billing period as indicated on the invoice.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    Fee Changes
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Areen Order Hub Hiring Solutions Pvt. Ltd, in its sole
                    discretion and at any time, may modify the Subscription fees
                    for the Subscriptions. Any Subscription fee change will
                    become effective at the end of the then-current Billing
                    Cycle.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Areen Order Hub Hiring Solutions Pvt. Ltd will provide you
                    with a reasonable prior notice of any change in Subscription
                    fees to give you an opportunity to terminate your
                    Subscription before such change becomes effective.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Your continued use of the Service after the Subscription fee
                    change comes into effect constitutes your agreement to pay
                    the modified Subscription fee amount.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}> Refunds</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Certain refund requests for Subscriptions may be considered
                    by Areen Order Hub Hiring Solutions Pvt. Ltd on a
                    case-by-case basis and granted in sole discretion of Areen
                    Order Hub Hiring Solutions Pvt. Ltd.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>Content</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Our Service allows you to post, link, store, share and
                    otherwise make available certain information, text,
                    graphics, videos, or other material ("Content"). You are
                    responsible for the Content that you post on or through the
                    Service, including its legality, reliability, and
                    appropriateness.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    By posting Content on or through the Service, You represent
                    and warrant that: (i) the Content is yours (you own it)
                    and/or you have the right to use it and the right to grant
                    us the rights and license as provided in these Terms, and
                    (ii) that the posting of your Content on or through the
                    Service does not violate the privacy rights, publicity
                    rights, copyrights, contract rights or any other rights of
                    any person or entity. We reserve the right to terminate the
                    account of anyone found to be infringing on a copyright.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    You retain any and all of your rights to any Content you
                    submit, post or display on or through the Service and you
                    are responsible for protecting those rights. We take no
                    responsibility and assume no liability for Content you or
                    any third party posts on or through the Service. However, by
                    posting Content using the Service you grant us the right and
                    license to use, modify, publicly perform, publicly display,
                    reproduce, and distribute such Content on and through the
                    Service.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Areen Order Hub Hiring Solutions Pvt. Ltd has the right but
                    not the obligation to monitor and edit all Content provided
                    by users.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    In addition, Content found on or through this Service are
                    the property of Areen Order Hub Hiring Solutions Pvt. Ltd or
                    used with permission. You may not distribute, modify,
                    transmit, reuse, download, repost, copy, or use said
                    Content, whether in whole or in part, for commercial
                    purposes or for personal gain, without express advance
                    written permission from us.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>Accounts</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    When you create an account with us, you guarantee that you
                    are above the age of 18, and that the information you
                    provide us is accurate, complete, and current at all times.
                    Inaccurate, incomplete, or obsolete information may result
                    in the immediate termination of your account on the Service.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    You are responsible for maintaining the confidentiality of
                    your account and password, including but not limited to the
                    restriction of access to your computer and/or account. You
                    agree to accept responsibility for any and all activities or
                    actions that occur under your account and/or password,
                    whether your password is with our Service or a third-party
                    service. You must notify us immediately upon becoming aware
                    of any breach of security or unauthorized use of your
                    account.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Intellectual Property The Service and its original content
                    (excluding Content provided by users), features and
                    functionality are and will remain the exclusive property of
                    Areen Order Hub Hiring Solutions Pvt. Ltd and its licensors.
                    The Service is protected by copyright, trademark, and other
                    laws of both the United States and foreign countries. Our
                    trademarks and trade dress may not be used in connection
                    with any product or service without the prior written
                    consent of Areen Order Hub Hiring Solutions Pvt. Ltd.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    {" "}
                    Links To Other Web Sites
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Our Service may contain links to third party web sites or
                    services that are not owned or controlled by Areen Order Hub
                    Hiring Solutions Pvt. Ltd.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Areen Order Hub Hiring Solutions Pvt. Ltd has no control
                    over, and assumes no responsibility for the content, privacy
                    policies, or practices of any third party web sites or
                    services. We do not warrant the offerings of any of these
                    entities/individuals or their websites.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    You acknowledge and agree that Areen Order Hub Hiring
                    Solutions Pvt. Ltd shall not be responsible or liable,
                    directly or indirectly, for any damage or loss caused or
                    alleged to be caused by or in connection with use of or
                    reliance on any such content, goods or services available on
                    or through any such third party web sites or services.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    We strongly advise you to read the terms and conditions and
                    privacy policies of any third party web sites or services
                    that you visit.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    Termination
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    We may terminate or suspend your account and bar access to
                    the Service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever and
                    without limitation, including but not limited to a breach of
                    the Terms.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    If you wish to terminate your account, you may simply
                    discontinue using the Service.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    All provisions of the Terms which by their nature should
                    survive termination shall survive termination, including,
                    without limitation, ownership provisions, warranty
                    disclaimers, indemnity and limitations of liability.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    Indemnification
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Indemnification You agree to defend, indemnify and hold
                    harmless Areen Order Hub Hiring Solutions Pvt. Ltd and its
                    licensee and licensors, and their employees, contractors,
                    agents, officers and directors, from and against any and all
                    claims, damages, obligations, losses, liabilities, costs or
                    debt, and expenses (including but not limited to attorney's
                    fees), resulting from or arising out of a) your use and
                    access of the Service, by you or any person using your
                    account and password; b) a breach of these Terms, or c)
                    Content posted on the Service.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    Limitation Of Liability
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    In no event shall Areen Order Hub Hiring Solutions Pvt. Ltd,
                    nor its directors, employees, partners, agents, suppliers,
                    or affiliates, be liable for any indirect, incidental,
                    special, consequential or punitive damages, including
                    without limitation, loss of profits, data, use, goodwill, or
                    other intangible losses, resulting from (i) your access to
                    or use of or inability to access or use the Service; (ii)
                    any conduct or content of any third party on the Service;
                    (iii) any content obtained from the Service; and (iv)
                    unauthorized access, use or alteration of your transmissions
                    or content, whether based on warranty, contract, tort
                    (including negligence) or any other legal theory, whether or
                    not we have been informed of the possibility of such damage,
                    and even if a remedy set forth herein is found to have
                    failed of its essential purpose.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>Disclaimer</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Your use of the Service is at your sole risk. The Service is
                    provided on an "AS IS" and "AS AVAILABLE" basis. The Service
                    is provided without warranties of any kind, whether express
                    or implied, including, but not limited to, implied
                    warranties of merchantability, fitness for a particular
                    purpose, non-infringement or course of performance.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Areen Order Hub Hiring Solutions Pvt. Ltd its subsidiaries,
                    affiliates, and its licensors do not warrant that a) the
                    Service will function uninterrupted, secure or available at
                    any particular time or location; b) any errors or defects
                    will be corrected; c) the Service is free of viruses or
                    other harmful components; or d) the results of using the
                    Service will meet your positions.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>Exclusions</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Some jurisdictions do not allow the exclusion of certain
                    warranties or the exclusion or limitation of liability for
                    consequential or incidental damages, so the limitations
                    above may not apply to you.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>
                    {" "}
                    Governing Law{" "}
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    These Terms shall be governed and construed in accordance
                    with the laws of Idaho, United States, without regard to its
                    conflict of law provisions.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    Our failure to enforce any right or provision of these Terms
                    will not be considered a waiver of those rights. If any
                    provision of these Terms is held to be invalid or
                    unenforceable by a court, the remaining provisions of these
                    Terms will remain in effect. These Terms constitute the
                    entire agreement between us regarding our Service, and
                    supersede and replace any prior agreements we might have had
                    between us regarding the Service.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}> Changes </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material
                    we will provide at least 30 days notice prior to any new
                    terms taking effect. What constitutes a material change will
                    be determined at our sole discretion.
                  </div>
                  <div className={clsx("bodyText", "mt-3")}>
                    By continuing to access or use our Service after any
                    revisions become effective, you agree to be bound by the
                    revised terms. If you do not agree to the new terms, you are
                    no longer authorized to use the Service.
                  </div>

                  <div className={clsx("sectionTitle", "mt-3")}>Contact Us</div>
                  <div className={clsx("bodyText", "mt-3")}>
                    If you have any questions about these Terms, please contact
                    us.
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Terms;
